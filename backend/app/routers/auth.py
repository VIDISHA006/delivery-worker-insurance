"""Authentication & Registration Router."""
from __future__ import annotations

from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models import Worker, Platform, RiskTier, Policy, PolicyStatus, PremiumCalculation, PayoutHistory
from app.schemas import (
    WorkerRegister, WorkerRegisterResponse, OTPVerify, OTPDispatchRequest, KYCVerify, UPISetup, WorkerResponse,
    AdminLoginRequest, AccountDeleteRequest,
)
from app.services.premium_engine import calculate_premium, get_risk_tier
from app.services.provider_gateway import (
    get_integration_status,
    normalize_phone,
    send_otp,
    setup_upi_mandate,
    verify_kyc_identity,
    verify_otp as verify_provider_otp,
)
from app.security import create_access_token, get_current_admin, get_current_worker

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/send-otp")
def dispatch_otp(data: OTPDispatchRequest):
    """Dispatch an OTP with cooldown and expiry handling."""
    result = send_otp(normalize_phone(data.phone), data.purpose)
    if not result["success"]:
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail=result["detail"])
    return result


@router.post("/login")
def login_worker(data: OTPVerify, db: Session = Depends(get_db)):
    """Login an existing worker with phone and OTP."""
    phone = normalize_phone(data.phone)
    worker = db.query(Worker).filter(Worker.phone == phone).first()
    if not worker:
        raise HTTPException(404, "Worker not found. Please register.")

    if worker.is_deleted:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="This account has already been deleted.")

    otp_valid, otp_message = verify_provider_otp(phone, data.otp, data.session_id)
    if not otp_valid:
        raise HTTPException(400, otp_message)

    policy = db.query(Policy).filter(Policy.worker_id == worker.id).order_by(Policy.id.desc()).first()
    has_active_policy = False
    if policy and policy.status == PolicyStatus.ACTIVE:
        has_active_policy = True

    worker.phone_verified = True
    worker.last_login_at = datetime.utcnow()
    db.commit()

    return {
        "success": True,
        "access_token": create_access_token(str(worker.id), "worker"),
        "token_type": "bearer",
        "worker": worker,
        "has_active_policy": has_active_policy,
        "integration_status": get_integration_status(),
    }


@router.post("/register", response_model=WorkerRegisterResponse)
def register_worker(data: WorkerRegister, db: Session = Depends(get_db)):
    """Register a new delivery worker."""
    phone = normalize_phone(data.phone)
    if not data.accepted_terms or not data.accepted_privacy or not data.accepted_automated_decisions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You must accept the terms, privacy notice, and automated decisioning disclosure to continue.",
        )

    existing = db.query(Worker).filter(Worker.phone == phone).first()
    if existing:
        raise HTTPException(400, "Phone number already registered")

    # Calculate initial risk tier from zone
    premium_data = calculate_premium(data.zone)
    risk_tier = get_risk_tier(premium_data["risk_score"])

    worker = Worker(
        name=data.name,
        phone=phone,
        zone=data.zone,
        city=data.city,
        platform=Platform(data.platform),
        partner_id=data.partner_id,
        vehicle_type=data.vehicle_type,
        weekly_income=data.weekly_income or 5200.0,
        risk_tier=RiskTier(risk_tier),
        terms_accepted_at=datetime.utcnow(),
        privacy_accepted_at=datetime.utcnow(),
        ai_notice_accepted_at=datetime.utcnow(),
    )
    db.add(worker)
    db.commit()
    db.refresh(worker)
    otp_meta = send_otp(worker.phone, "registration")
    return {
        **WorkerResponse.model_validate(worker).model_dump(),
        "otp_session": {
            "session_id": otp_meta.get("session_id"),
            "expires_in": otp_meta.get("expires_in"),
            "provider_mode": otp_meta.get("provider_mode"),
            "provider_name": otp_meta.get("provider_name"),
            "demo_otp": otp_meta.get("demo_otp"),
        },
    }


@router.post("/verify-otp")
def verify_otp(data: OTPVerify, db: Session = Depends(get_db)):
    """Verify phone OTP. Mock: accepts '1234' for any phone."""
    phone = normalize_phone(data.phone)
    worker = db.query(Worker).filter(Worker.phone == phone).first()
    if not worker:
        raise HTTPException(404, "Worker not found")
    if worker.is_deleted:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="This account has already been deleted.")

    otp_valid, otp_message = verify_provider_otp(phone, data.otp, data.session_id)
    if otp_valid:
        worker.phone_verified = True
        worker.last_login_at = datetime.utcnow()
        db.commit()
        return {
            "verified": True,
            "worker_id": worker.id,
            "message": "Phone verified successfully",
            "access_token": create_access_token(str(worker.id), "worker"),
            "token_type": "bearer",
            "worker": worker,
            "integration_status": get_integration_status(),
        }

    raise HTTPException(400, otp_message)


@router.post("/kyc")
def verify_kyc(
    data: KYCVerify,
    db: Session = Depends(get_db),
    current_worker: Worker = Depends(get_current_worker),
):
    """Aadhaar e-KYC verification. Mock: instant verification."""
    if current_worker.id != data.worker_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You can only verify your own account.")

    kyc_result = verify_kyc_identity(data.aadhaar_number, current_worker.name)
    if not kyc_result["verified"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="KYC verification failed.")

    current_worker.aadhaar_verified = True
    db.commit()

    return {
        "verified": True,
        "worker_id": current_worker.id,
        "kyc_status": "completed",
        "method": kyc_result["provider_name"],
        "provider_mode": kyc_result["provider_mode"],
        "reference_id": kyc_result["reference_id"],
    }


@router.post("/setup-upi")
def setup_upi(
    data: UPISetup,
    db: Session = Depends(get_db),
    current_worker: Worker = Depends(get_current_worker),
):
    """Setup UPI AutoPay mandate."""
    if current_worker.id != data.worker_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You can only update your own payment setup.")

    mandate_result = setup_upi_mandate(
        worker_name=current_worker.name,
        phone=current_worker.phone,
        upi_id=data.upi_id,
    )

    current_worker.upi_id = data.upi_id
    current_worker.onboarding_complete = True
    db.commit()

    return {
        "success": True,
        "worker_id": current_worker.id,
        "upi_id": data.upi_id,
        "autopay_status": mandate_result["status"],
        "deduction_day": "Monday 06:00 IST",
        "provider_mode": mandate_result["provider_mode"],
        "provider_name": mandate_result["provider_name"],
        "mandate_ref": mandate_result["mandate_ref"],
    }


@router.post("/admin/login")
def admin_login(data: AdminLoginRequest):
    """Create an admin session for the operations portal."""
    if data.username != settings.admin_username or data.password != settings.admin_password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid admin credentials.")

    return {
        "success": True,
        "access_token": create_access_token(data.username, "admin"),
        "token_type": "bearer",
    }


@router.get("/me", response_model=WorkerResponse)
def get_my_profile(current_worker: Worker = Depends(get_current_worker)):
    """Get the authenticated worker profile."""
    return current_worker


@router.get("/profile/{worker_id}", response_model=WorkerResponse)
def get_profile(
    worker_id: int,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin),
):
    """Admin-only worker profile lookup."""
    worker = db.query(Worker).filter(Worker.id == worker_id).first()
    if not worker:
        raise HTTPException(404, "Worker not found")
    return worker


@router.get("/workers")
def list_workers(
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin),
):
    """List all registered workers."""
    workers = db.query(Worker).filter(Worker.is_deleted.is_(False)).all()
    return [
        {
            "id": w.id,
            "name": w.name,
            "phone": w.phone,
            "zone": w.zone,
            "platform": w.platform.value if w.platform else None,
            "risk_tier": w.risk_tier.value if w.risk_tier else None,
            "onboarding_complete": w.onboarding_complete,
            "created_at": w.created_at.isoformat() if w.created_at else None,
        }
        for w in workers
    ]


@router.get("/support")
def get_support_information():
    """Public support and legal contact information."""
    return {
        "support_email": settings.support_email,
        "support_phone": settings.support_phone,
        "support_hours": "Mon-Sat, 09:00-18:00 IST",
        "account_deletion_available_in_app": True,
        "automated_decisions_notice": "Risk scoring and fraud review are assisted by internal models and are subject to manual review on appeal.",
        "integration_status": get_integration_status(),
    }


@router.delete("/account")
def delete_account(
    data: AccountDeleteRequest,
    db: Session = Depends(get_db),
    current_worker: Worker = Depends(get_current_worker),
):
    """Delete/anonymise the authenticated worker account."""
    if data.otp != settings.demo_otp:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid OTP confirmation.")
    if data.confirmation_text.strip().upper() != "DELETE":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Type "DELETE" to confirm account deletion.')

    timestamp = datetime.utcnow()

    db.query(PremiumCalculation).filter(PremiumCalculation.worker_id == current_worker.id).delete()

    payouts = db.query(PayoutHistory).filter(PayoutHistory.worker_id == current_worker.id).all()
    for payout in payouts:
        payout.upi_id = "deleted"
        payout.transaction_ref = payout.transaction_ref or "retained-for-audit"

    policies = db.query(Policy).filter(Policy.worker_id == current_worker.id).all()
    for policy in policies:
        policy.status = PolicyStatus.EXPIRED
        policy.auto_renew = False

    current_worker.name = "Deleted Account"
    current_worker.phone = f"deleted-{current_worker.id}"
    current_worker.email = None
    current_worker.zone = "Deleted"
    current_worker.city = "Deleted"
    current_worker.partner_id = None
    current_worker.vehicle_type = "deleted"
    current_worker.upi_id = None
    current_worker.weekly_income = 0
    current_worker.aadhaar_verified = False
    current_worker.phone_verified = False
    current_worker.onboarding_complete = False
    current_worker.is_deleted = True
    current_worker.deleted_at = timestamp

    db.commit()

    return {
        "success": True,
        "deleted_at": timestamp.isoformat(),
        "message": "Account deleted. Personal profile data has been removed and financial records retained in anonymised form for audit purposes.",
    }
