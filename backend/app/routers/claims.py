"""Claims Management Router."""
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Claim, Worker, Trigger, Policy, ClaimStatus, PayoutHistory
from app.security import get_current_admin, get_current_worker, require_cron_access
from app.services.claims_processor import approve_claim, reject_claim
from app.services.scheduler import review_pending_claims_job

router = APIRouter(prefix="/api/claims", tags=["Claims"])


def _serialize_claims(claims):
    return [
        {
            "id": c.id,
            "trigger_type": t.type.value,
            "trigger_severity": t.severity,
            "amount": c.amount,
            "fraud_score": c.fraud_score,
            "fraud_tier": c.fraud_tier.value,
            "status": c.status.value,
            "created_at": c.created_at.isoformat() if c.created_at else None,
            "paid_at": c.paid_at.isoformat() if c.paid_at else None,
            "zone": t.zone,
            "trigger_description": t.description,
        }
        for c, t in claims
    ]


@router.get("/review")
def review_claims(request: Request, _: None = Depends(require_cron_access)):
    """Run one pending-claims review cycle for Vercel Cron or manual checks."""
    result = review_pending_claims_job()
    return {
        "invoked_at": datetime.utcnow().isoformat(),
        "invoker": "vercel-cron" if request.headers.get("user-agent", "").lower().startswith("vercel-cron") else "manual",
        **result,
    }


@router.get("/me")
def get_my_claims(current_worker: Worker = Depends(get_current_worker), db: Session = Depends(get_db)):
    """Get all claims for the authenticated worker with trigger details."""
    claims = (
        db.query(Claim, Trigger)
        .join(Trigger, Claim.trigger_id == Trigger.id)
        .filter(Claim.worker_id == current_worker.id)
        .order_by(Claim.created_at.desc())
        .all()
    )
    return _serialize_claims(claims)


@router.get("/worker/{worker_id}")
def get_worker_claims(
    worker_id: int,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin),
):
    """Admin-only worker claims lookup."""
    claims = (
        db.query(Claim, Trigger)
        .join(Trigger, Claim.trigger_id == Trigger.id)
        .filter(Claim.worker_id == worker_id)
        .order_by(Claim.created_at.desc())
        .all()
    )
    return _serialize_claims(claims)


@router.get("/{claim_id}")
def get_claim_detail(
    claim_id: int,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin),
):
    """Get detailed claim information with fraud analysis."""
    claim = db.query(Claim).filter(Claim.id == claim_id).first()
    if not claim:
        raise HTTPException(404, "Claim not found")

    trigger = db.query(Trigger).filter(Trigger.id == claim.trigger_id).first()
    worker = db.query(Worker).filter(Worker.id == claim.worker_id).first()
    payout = db.query(PayoutHistory).filter(PayoutHistory.claim_id == claim.id).first()

    return {
        "id": claim.id,
        "worker": {
            "id": worker.id,
            "name": worker.name,
            "phone": worker.phone,
            "zone": worker.zone,
        },
        "trigger": {
            "id": trigger.id,
            "type": trigger.type.value,
            "severity": trigger.severity,
            "primary_signal": trigger.primary_signal,
            "primary_value": trigger.primary_value,
            "secondary_signal": trigger.secondary_signal,
            "secondary_value": trigger.secondary_value,
            "fired_at": trigger.fired_at.isoformat() if trigger.fired_at else None,
        },
        "claim": {
            "amount": claim.amount,
            "fraud_score": claim.fraud_score,
            "fraud_tier": claim.fraud_tier.value,
            "fraud_details": claim.fraud_details,
            "status": claim.status.value,
            "created_at": claim.created_at.isoformat() if claim.created_at else None,
            "reviewed_at": claim.reviewed_at.isoformat() if claim.reviewed_at else None,
            "paid_at": claim.paid_at.isoformat() if claim.paid_at else None,
            "review_notes": claim.review_notes,
        },
        "payout": {
            "id": payout.id if payout else None,
            "amount": payout.amount if payout else None,
            "upi_id": payout.upi_id if payout else None,
            "transaction_ref": payout.transaction_ref if payout else None,
            "status": payout.status if payout else None,
            "completed_at": payout.completed_at.isoformat() if payout and payout.completed_at else None,
        } if payout else None,
    }


@router.put("/{claim_id}/approve")
def approve(
    claim_id: int,
    notes: str = None,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin),
):
    """Admin: Approve a pending claim."""
    result = approve_claim(db, claim_id, notes)
    if "error" in result:
        raise HTTPException(404, result["error"])
    return result


@router.put("/{claim_id}/reject")
def reject(
    claim_id: int,
    notes: str = None,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin),
):
    """Admin: Reject a pending claim."""
    result = reject_claim(db, claim_id, notes)
    if "error" in result:
        raise HTTPException(404, result["error"])
    return result


@router.get("/all/summary")
def all_claims_summary(
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin),
):
    """Get summary of all claims for admin dashboard."""
    claims = (
        db.query(Claim, Worker, Trigger)
        .join(Worker, Claim.worker_id == Worker.id)
        .join(Trigger, Claim.trigger_id == Trigger.id)
        .order_by(Claim.created_at.desc())
        .all()
    )
    return [
        {
            "id": c.id,
            "worker_name": w.name,
            "worker_zone": w.zone,
            "trigger_type": t.type.value,
            "amount": c.amount,
            "fraud_score": c.fraud_score,
            "fraud_tier": c.fraud_tier.value,
            "status": c.status.value,
            "created_at": c.created_at.isoformat() if c.created_at else None,
            "paid_at": c.paid_at.isoformat() if c.paid_at else None,
        }
        for c, w, t in claims
    ]
