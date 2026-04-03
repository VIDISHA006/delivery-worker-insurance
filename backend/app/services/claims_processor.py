"""Zero-Touch Claims Processor.

Pipeline: Trigger fires → Find eligible policies → Run fraud check →
Auto-approve GREEN → Queue AMBER/RED → Initiate UPI payout.
"""
import random
import string
from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from app.models import (
    Worker, Policy, Claim, Trigger, PayoutHistory,
    ClaimStatus, FraudTier, PolicyStatus, TriggerType, TriggerStatus,
)
from app.services.fraud_engine import generate_fraud_score
from app.services.premium_engine import MAX_PREMIUM
from app.services.provider_gateway import guidewire_sync_record, initiate_payout_gateway


def process_trigger_claims(db: Session, trigger: Trigger) -> list[dict]:
    """Process all eligible claims when a trigger fires.

    This is the automatic payout pipeline:
    1. Find all workers with active policies in the trigger zone
    2. Run fraud detection on each
    3. Auto-approve GREEN, queue AMBER/RED
    4. Initiate payouts for approved claims
    """
    results = []

    # Find Active policies in the affected zone
    eligible_policies = (
        db.query(Policy)
        .join(Worker)
        .filter(
            Worker.zone == trigger.zone,
            Policy.status == PolicyStatus.ACTIVE,
        )
        .all()
    )

    for policy in eligible_policies:
        worker = policy.worker

        # Count recent claims for fraud check
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        recent_claims = (
            db.query(Claim)
            .filter(
                Claim.worker_id == worker.id,
                Claim.created_at >= thirty_days_ago,
            )
            .count()
        )

        # Run fraud detection
        fraud_result = generate_fraud_score(
            claim_zone=trigger.zone,
            gps_zone=worker.zone,  # In real app, this comes from GPS
            claim_time=datetime.utcnow(),
            trigger_time=trigger.fired_at,
            worker_id=worker.id,
            recent_claims_count=recent_claims,
            gps_available=True,
        )

        # Calculate payout amount
        income_replacement_factor = 4.5
        payout_amount = round(
            policy.weekly_premium * income_replacement_factor * trigger.payout_percentage,
            2
        )

        # Create claim
        fraud_tier_enum = FraudTier.GREEN
        claim_status = ClaimStatus.AUTO_APPROVED

        if fraud_result["fraud_tier"] == "amber":
            fraud_tier_enum = FraudTier.AMBER
            claim_status = ClaimStatus.PENDING_REVIEW
        elif fraud_result["fraud_tier"] == "red":
            fraud_tier_enum = FraudTier.RED
            claim_status = ClaimStatus.PENDING_REVIEW

        claim = Claim(
            policy_id=policy.id,
            trigger_id=trigger.id,
            worker_id=worker.id,
            amount=payout_amount,
            fraud_score=fraud_result["fraud_score"],
            fraud_tier=fraud_tier_enum,
            fraud_details=fraud_result,
            status=claim_status,
            created_at=datetime.utcnow(),
        )
        db.add(claim)
        db.flush()  # Get claim ID

        guidewire_meta = guidewire_sync_record(
            "claim",
            {
                "claim_id": claim.id,
                "worker_id": worker.id,
                "zone": trigger.zone,
                "trigger_type": trigger.type.value,
                "amount": payout_amount,
                "fraud_tier": fraud_result["fraud_tier"],
            },
        )
        claim.review_notes = f"Guidewire sync: {guidewire_meta['external_ref']} ({guidewire_meta['provider_mode']})"

        # Auto-approve GREEN claims → initiate payout
        payout = None
        if claim_status == ClaimStatus.AUTO_APPROVED:
            payout = _initiate_payout(db, claim, worker)
            claim.paid_at = datetime.utcnow()
            claim.status = ClaimStatus.PAID

            # Update policy stats
            policy.total_claims_paid += payout_amount

        results.append({
            "claim_id": claim.id,
            "worker_id": worker.id,
            "worker_name": worker.name,
            "zone": worker.zone,
            "amount": payout_amount,
            "fraud_score": fraud_result["fraud_score"],
            "fraud_tier": fraud_result["fraud_tier"],
            "status": claim.status.value,
            "payout": {
                "id": payout.id if payout else None,
                "upi_id": worker.upi_id,
                "status": payout.status if payout else "pending_review",
            },
            "integration": guidewire_meta,
        })

    db.commit()
    return results


def approve_claim(db: Session, claim_id: int, notes: str = None) -> dict:
    """Manually approve an AMBER/RED claim after review."""
    claim = db.query(Claim).filter(Claim.id == claim_id).first()
    if not claim:
        return {"error": "Claim not found"}

    worker = db.query(Worker).filter(Worker.id == claim.worker_id).first()

    claim.status = ClaimStatus.APPROVED
    claim.review_notes = notes
    claim.reviewed_at = datetime.utcnow()

    payout = _initiate_payout(db, claim, worker)
    claim.paid_at = datetime.utcnow()
    claim.status = ClaimStatus.PAID

    db.commit()

    return {
        "claim_id": claim.id,
        "status": "paid",
        "payout_id": payout.id,
        "amount": claim.amount,
    }


def reject_claim(db: Session, claim_id: int, notes: str = None) -> dict:
    """Reject a claim after review."""
    claim = db.query(Claim).filter(Claim.id == claim_id).first()
    if not claim:
        return {"error": "Claim not found"}

    claim.status = ClaimStatus.REJECTED
    claim.review_notes = notes
    claim.reviewed_at = datetime.utcnow()
    db.commit()

    return {
        "claim_id": claim.id,
        "status": "rejected",
        "notes": notes,
    }


def _initiate_payout(db: Session, claim: Claim, worker: Worker) -> PayoutHistory:
    """Simulate UPI payout initiation."""
    provider_result = initiate_payout_gateway(
        worker_name=worker.name,
        phone=worker.phone,
        upi_id=worker.upi_id or f"{worker.phone}@upi",
        amount=claim.amount,
        reference=f"GS-CLAIM-{claim.id}",
    )
    txn_ref = provider_result["payout_ref"]

    payout = PayoutHistory(
        claim_id=claim.id,
        worker_id=worker.id,
        amount=claim.amount,
        upi_id=worker.upi_id or f"{worker.phone}@upi",
        transaction_ref=txn_ref,
        status=provider_result["status"],
        initiated_at=datetime.utcnow(),
        completed_at=datetime.utcnow(),
    )
    db.add(payout)
    return payout
