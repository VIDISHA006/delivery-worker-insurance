"""Pydantic schemas for request/response validation."""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


# ── Worker Schemas ─────────────────────────────────────────────────────

class WorkerRegister(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., pattern=r"^[6-9]\d{9}$")
    platform: str = Field(..., description="zepto, blinkit, dunzo, swiggy_instamart")
    zone: str
    city: str = "Bengaluru"
    vehicle_type: str = "2-wheeler"
    partner_id: Optional[str] = None
    weekly_income: Optional[float] = 5200.0
    accepted_terms: bool = False
    accepted_privacy: bool = False
    accepted_automated_decisions: bool = False


class OTPVerify(BaseModel):
    phone: str
    otp: str
    session_id: Optional[str] = None


class OTPDispatchRequest(BaseModel):
    phone: str = Field(..., pattern=r"^[6-9]\d{9}$")
    purpose: str = "login"


class KYCVerify(BaseModel):
    worker_id: int
    aadhaar_number: str = Field(..., pattern=r"^\d{12}$")


class UPISetup(BaseModel):
    worker_id: int
    upi_id: str


class AdminLoginRequest(BaseModel):
    username: str
    password: str


class AccountDeleteRequest(BaseModel):
    otp: str
    confirmation_text: str


class OTPSessionInfo(BaseModel):
    session_id: str
    expires_in: int
    provider_mode: str
    provider_name: Optional[str] = None
    demo_otp: Optional[str] = None


class WorkerResponse(BaseModel):
    id: int
    name: str
    phone: str
    zone: str
    city: str
    platform: str
    vehicle_type: str
    upi_id: Optional[str]
    risk_tier: str
    weekly_income: float
    renewal_credit_balance: float
    aadhaar_verified: bool
    phone_verified: bool
    onboarding_complete: bool
    is_deleted: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class WorkerRegisterResponse(WorkerResponse):
    otp_session: Optional[OTPSessionInfo] = None


# ── Policy Schemas ─────────────────────────────────────────────────────

class PolicyCreate(BaseModel):
    worker_id: int
    plan_type: str = "standard"  # standard or premium


class PolicyResponse(BaseModel):
    id: int
    worker_id: int
    plan_type: str
    weekly_premium: float
    coverage_amount: float
    status: str
    auto_renew: bool
    start_date: datetime
    end_date: datetime
    weeks_active: int
    total_premiums_paid: float
    total_claims_paid: float
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class PolicyRenew(BaseModel):
    policy_id: int


# ── Premium Schemas ────────────────────────────────────────────────────

class PremiumCalculateRequest(BaseModel):
    zone: str
    worker_id: Optional[int] = None
    week_of_year: Optional[int] = None


class PremiumFactorDetail(BaseModel):
    factor_name: str
    value: float
    impact: str  # "increases" or "decreases"
    weight: float


class PremiumResponse(BaseModel):
    zone: str
    base_premium: float
    zone_multiplier: float
    seasonal_factor: float
    final_premium: float
    risk_score: float
    factors: list[PremiumFactorDetail]
    savings_vs_max: float  # how much saved compared to Rs. 89


# ── Trigger Schemas ────────────────────────────────────────────────────

class TriggerCheckRequest(BaseModel):
    zone: str
    city: str = "Bengaluru"


class TriggerSimulateRequest(BaseModel):
    zone: str
    severity: str = "severe"  # moderate, severe, extreme


class TriggerResponse(BaseModel):
    id: int
    type: str
    zone: str
    severity: str
    primary_signal: str
    primary_value: float
    secondary_signal: str
    secondary_value: float
    payout_percentage: float
    status: str
    description: Optional[str]
    fired_at: datetime
    resolved_at: Optional[datetime]
    claims_generated: int = 0

    model_config = ConfigDict(from_attributes=True)


# ── Claim Schemas ──────────────────────────────────────────────────────

class ClaimResponse(BaseModel):
    id: int
    policy_id: int
    trigger_id: int
    worker_id: int
    amount: float
    fraud_score: float
    fraud_tier: str
    fraud_details: Optional[dict]
    status: str
    review_notes: Optional[str]
    created_at: datetime
    reviewed_at: Optional[datetime]
    paid_at: Optional[datetime]
    trigger_type: Optional[str] = None
    worker_name: Optional[str] = None
    zone: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class ClaimReview(BaseModel):
    claim_id: int
    action: str  # approve or reject
    notes: Optional[str] = None


class ClaimFeedbackSubmission(BaseModel):
    experienced_disruption: bool
    payout_helpfulness: str = Field(..., pattern=r"^(low|right|high)$")
    route_status: str = Field(..., pattern=r"^(stopped|slowed|normal)$")
    notes: Optional[str] = Field(default=None, max_length=240)


# ── Admin Dashboard ────────────────────────────────────────────────────

class DashboardKPIs(BaseModel):
    total_workers: int
    active_policies: int
    total_claims: int
    claims_paid: int
    claims_pending: int
    claims_rejected: int
    total_premiums_collected: float
    total_claims_amount: float
    combined_loss_ratio: float
    avg_payout_latency_hours: float
    fraud_detection_rate: float
    policy_renewal_rate: float
    premium_collection_rate: float
    active_triggers: int
    zones_covered: int


class ZoneAnalytics(BaseModel):
    zone: str
    active_workers: int
    active_policies: int
    avg_premium: float
    total_triggers: int
    total_claims: int
    total_payouts: float
    risk_tier: str


class PayoutResponse(BaseModel):
    id: int
    claim_id: int
    worker_id: int
    amount: float
    upi_id: str
    transaction_ref: Optional[str]
    status: str
    initiated_at: datetime
    completed_at: Optional[datetime]

    model_config = ConfigDict(from_attributes=True)
