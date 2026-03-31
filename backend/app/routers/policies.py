"""Policy Management Router."""
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Worker, Policy, PolicyStatus
from app.schemas import PolicyCreate, PolicyResponse
from app.security import get_current_admin, get_current_worker
from app.services.premium_engine import calculate_premium
from app.services.provider_gateway import guidewire_rate_quote, guidewire_sync_record

router = APIRouter(prefix="/api/policies", tags=["Policies"])

PLAN_MULTIPLIERS = {"standard": 1.0, "premium": 1.3}


@router.post("/create", response_model=PolicyResponse)
def create_policy(
    data: PolicyCreate,
    db: Session = Depends(get_db),
    current_worker: Worker = Depends(get_current_worker),
):
    """Create a new insurance policy with dynamic premium."""
    if current_worker.id != data.worker_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You can only create a policy for your own account.")
    if not current_worker.phone_verified:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Verify your phone number before buying a policy.")
    if not current_worker.aadhaar_verified:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Complete KYC before buying a policy.")
    if not current_worker.upi_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Add a payout method before buying a policy.")

    # Check for existing active policy
    existing = (
        db.query(Policy)
        .filter(Policy.worker_id == current_worker.id, Policy.status == PolicyStatus.ACTIVE)
        .first()
    )
    if existing:
        raise HTTPException(400, "Worker already has an active policy")

    # Calculate dynamic premium
    premium_data = calculate_premium(current_worker.zone)
    guidewire_quote = guidewire_rate_quote({
        "worker_id": current_worker.id,
        "zone": current_worker.zone,
        "plan_type": data.plan_type,
        "model_premium": premium_data["final_premium"],
        "risk_score": premium_data["risk_score"],
    })
    plan_mult = PLAN_MULTIPLIERS.get(data.plan_type, 1.0)
    weekly_premium = round(premium_data["final_premium"] * plan_mult, 2)

    # Coverage amount = weekly premium × 4.5 income replacement factor
    coverage_amount = round(weekly_premium * 4.5, 2)

    now = datetime.utcnow()
    policy = Policy(
        worker_id=current_worker.id,
        plan_type=data.plan_type,
        weekly_premium=weekly_premium,
        coverage_amount=coverage_amount,
        status=PolicyStatus.ACTIVE,
        auto_renew=True,
        start_date=now,
        end_date=now + timedelta(days=7),
        weeks_active=1,
        total_premiums_paid=weekly_premium,
    )
    db.add(policy)
    db.commit()
    db.refresh(policy)
    guidewire_sync_record(
        "policy",
        {
            "policy_id": policy.id,
            "worker_id": current_worker.id,
            "zone": current_worker.zone,
            "weekly_premium": weekly_premium,
            "coverage_amount": coverage_amount,
            "guidewire_quote": guidewire_quote,
        },
    )
    return policy


@router.get("/me")
def get_my_policies(current_worker: Worker = Depends(get_current_worker), db: Session = Depends(get_db)):
    """Get all policies for the authenticated worker."""
    policies = db.query(Policy).filter(Policy.worker_id == current_worker.id).all()
    return [
        {
            "id": p.id,
            "plan_type": p.plan_type,
            "weekly_premium": p.weekly_premium,
            "coverage_amount": p.coverage_amount,
            "status": p.status.value,
            "auto_renew": p.auto_renew,
            "start_date": p.start_date.isoformat() if p.start_date else None,
            "end_date": p.end_date.isoformat() if p.end_date else None,
            "weeks_active": p.weeks_active,
            "total_premiums_paid": p.total_premiums_paid,
            "total_claims_paid": p.total_claims_paid,
        }
        for p in policies
    ]


@router.put("/{policy_id}/renew")
def renew_policy(
    policy_id: int,
    db: Session = Depends(get_db),
    current_worker: Worker = Depends(get_current_worker),
):
    """Renew policy for another week."""
    policy = db.query(Policy).filter(Policy.id == policy_id).first()
    if not policy:
        raise HTTPException(404, "Policy not found")
    if policy.worker_id != current_worker.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You can only renew your own policy.")

    worker = db.query(Worker).filter(Worker.id == policy.worker_id).first()

    # Recalculate premium (it may have changed due to seasonal factors)
    premium_data = calculate_premium(worker.zone)
    guidewire_quote = guidewire_rate_quote({
        "worker_id": worker.id,
        "zone": worker.zone,
        "plan_type": policy.plan_type,
        "model_premium": premium_data["final_premium"],
        "risk_score": premium_data["risk_score"],
        "renewal": True,
    })
    plan_mult = PLAN_MULTIPLIERS.get(policy.plan_type, 1.0)

    policy.weekly_premium = round(premium_data["final_premium"] * plan_mult, 2)
    policy.coverage_amount = round(policy.weekly_premium * 4.5, 2)
    policy.end_date = policy.end_date + timedelta(days=7)
    policy.weeks_active += 1
    policy.total_premiums_paid += policy.weekly_premium
    policy.status = PolicyStatus.ACTIVE
    db.commit()
    sync_meta = guidewire_sync_record(
        "policy",
        {
            "policy_id": policy.id,
            "worker_id": worker.id,
            "zone": worker.zone,
            "renewal": True,
            "weekly_premium": policy.weekly_premium,
            "guidewire_quote": guidewire_quote,
        },
    )

    return {
        "policy_id": policy.id,
        "status": "renewed",
        "new_premium": policy.weekly_premium,
        "coverage_until": policy.end_date.isoformat(),
        "weeks_active": policy.weeks_active,
        "total_paid": policy.total_premiums_paid,
        "integration": {
            "guidewire_quote_mode": guidewire_quote["provider_mode"],
            "guidewire_sync_ref": sync_meta["external_ref"],
        },
    }


@router.put("/{policy_id}/pause")
def pause_policy(
    policy_id: int,
    db: Session = Depends(get_db),
    current_worker: Worker = Depends(get_current_worker),
):
    """Pause coverage — no lock-in, no penalty."""
    policy = db.query(Policy).filter(Policy.id == policy_id).first()
    if not policy:
        raise HTTPException(404, "Policy not found")
    if policy.worker_id != current_worker.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You can only pause your own policy.")

    policy.status = PolicyStatus.PAUSED
    db.commit()

    return {"policy_id": policy.id, "status": "paused", "message": "Coverage paused. Reactivate anytime."}


@router.put("/{policy_id}/activate")
def activate_policy(
    policy_id: int,
    db: Session = Depends(get_db),
    current_worker: Worker = Depends(get_current_worker),
):
    """Reactivate a paused policy."""
    policy = db.query(Policy).filter(Policy.id == policy_id).first()
    if not policy:
        raise HTTPException(404, "Policy not found")
    if policy.worker_id != current_worker.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You can only reactivate your own policy.")

    policy.status = PolicyStatus.ACTIVE
    policy.end_date = datetime.utcnow() + timedelta(days=7)
    policy.weeks_active += 1
    db.commit()

    return {"policy_id": policy.id, "status": "active", "coverage_until": policy.end_date.isoformat()}


@router.get("/all")
def list_all_policies(
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin),
):
    """Admin: List all policies."""
    policies = (
        db.query(Policy, Worker)
        .join(Worker, Policy.worker_id == Worker.id)
        .all()
    )
    return [
        {
            "id": p.id,
            "worker_id": p.worker_id,
            "worker_name": w.name,
            "zone": w.zone,
            "plan_type": p.plan_type,
            "weekly_premium": p.weekly_premium,
            "coverage_amount": p.coverage_amount,
            "status": p.status.value,
            "weeks_active": p.weeks_active,
            "total_premiums_paid": p.total_premiums_paid,
            "total_claims_paid": p.total_claims_paid,
        }
        for p, w in policies
    ]
