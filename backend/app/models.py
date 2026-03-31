"""SQLAlchemy ORM Models for GigShield."""
import enum
from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Float, Boolean, DateTime, ForeignKey,
    Text, Enum as SAEnum, JSON
)
from sqlalchemy.orm import relationship
from app.database import Base


# ── Enums ──────────────────────────────────────────────────────────────

class RiskTier(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class PolicyStatus(str, enum.Enum):
    ACTIVE = "active"
    LAPSED = "lapsed"
    PAUSED = "paused"
    EXPIRED = "expired"


class ClaimStatus(str, enum.Enum):
    AUTO_APPROVED = "auto_approved"
    PENDING_REVIEW = "pending_review"
    APPROVED = "approved"
    REJECTED = "rejected"
    PAID = "paid"


class FraudTier(str, enum.Enum):
    GREEN = "green"
    AMBER = "amber"
    RED = "red"


class TriggerType(str, enum.Enum):
    RAINFALL = "rainfall"
    AQI = "aqi"
    HEAT = "heat"
    CURFEW = "curfew"
    FLOODING = "flooding"


class TriggerStatus(str, enum.Enum):
    ACTIVE = "active"
    RESOLVED = "resolved"
    EXPIRED = "expired"


class Platform(str, enum.Enum):
    ZEPTO = "zepto"
    BLINKIT = "blinkit"
    DUNZO = "dunzo"
    SWIGGY_INSTAMART = "swiggy_instamart"


# ── Models ─────────────────────────────────────────────────────────────

class Worker(Base):
    __tablename__ = "workers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(15), unique=True, nullable=False, index=True)
    email = Column(String(100), nullable=True)
    zone = Column(String(50), nullable=False)
    city = Column(String(50), default="Bengaluru")
    platform = Column(SAEnum(Platform), nullable=False)
    partner_id = Column(String(50), nullable=True)
    vehicle_type = Column(String(20), default="2-wheeler")
    upi_id = Column(String(100), nullable=True)
    aadhaar_verified = Column(Boolean, default=False)
    phone_verified = Column(Boolean, default=False)
    risk_tier = Column(SAEnum(RiskTier), default=RiskTier.MEDIUM)
    weekly_income = Column(Float, default=5200.0)
    onboarding_complete = Column(Boolean, default=False)
    is_deleted = Column(Boolean, default=False, nullable=False)
    deleted_at = Column(DateTime, nullable=True)
    terms_accepted_at = Column(DateTime, nullable=True)
    privacy_accepted_at = Column(DateTime, nullable=True)
    ai_notice_accepted_at = Column(DateTime, nullable=True)
    last_login_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    policies = relationship("Policy", back_populates="worker")
    premium_calculations = relationship("PremiumCalculation", back_populates="worker")


class Policy(Base):
    __tablename__ = "policies"

    id = Column(Integer, primary_key=True, index=True)
    worker_id = Column(Integer, ForeignKey("workers.id"), nullable=False)
    plan_type = Column(String(20), default="standard")  # standard, premium
    weekly_premium = Column(Float, nullable=False)
    coverage_amount = Column(Float, nullable=False)  # max payout per event
    status = Column(SAEnum(PolicyStatus), default=PolicyStatus.ACTIVE)
    auto_renew = Column(Boolean, default=True)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    weeks_active = Column(Integer, default=0)
    total_premiums_paid = Column(Float, default=0.0)
    total_claims_paid = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)

    worker = relationship("Worker", back_populates="policies")
    claims = relationship("Claim", back_populates="policy")


class Trigger(Base):
    __tablename__ = "triggers"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(SAEnum(TriggerType), nullable=False)
    zone = Column(String(50), nullable=False)
    city = Column(String(50), default="Bengaluru")
    severity = Column(String(20), nullable=False)  # moderate, severe, extreme
    primary_signal = Column(String(100), nullable=False)
    primary_value = Column(Float, nullable=False)
    secondary_signal = Column(String(100), nullable=False)
    secondary_value = Column(Float, nullable=False)
    payout_percentage = Column(Float, nullable=False)
    status = Column(SAEnum(TriggerStatus), default=TriggerStatus.ACTIVE)
    description = Column(Text, nullable=True)
    fired_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)
    raw_data = Column(JSON, nullable=True)

    claims = relationship("Claim", back_populates="trigger")


class Claim(Base):
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)
    policy_id = Column(Integer, ForeignKey("policies.id"), nullable=False)
    trigger_id = Column(Integer, ForeignKey("triggers.id"), nullable=False)
    worker_id = Column(Integer, ForeignKey("workers.id"), nullable=False)
    amount = Column(Float, nullable=False)
    fraud_score = Column(Float, default=0.0)
    fraud_tier = Column(SAEnum(FraudTier), default=FraudTier.GREEN)
    fraud_details = Column(JSON, nullable=True)
    status = Column(SAEnum(ClaimStatus), default=ClaimStatus.AUTO_APPROVED)
    review_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    reviewed_at = Column(DateTime, nullable=True)
    paid_at = Column(DateTime, nullable=True)

    policy = relationship("Policy", back_populates="claims")
    trigger = relationship("Trigger", back_populates="claims")
    payout = relationship("PayoutHistory", back_populates="claim", uselist=False)


class PremiumCalculation(Base):
    __tablename__ = "premium_calculations"

    id = Column(Integer, primary_key=True, index=True)
    worker_id = Column(Integer, ForeignKey("workers.id"), nullable=True)
    zone = Column(String(50), nullable=False)
    risk_score = Column(Float, nullable=False)
    base_premium = Column(Float, default=142.0)
    zone_multiplier = Column(Float, nullable=False)
    seasonal_factor = Column(Float, default=1.0)
    final_premium = Column(Float, nullable=False)
    factors = Column(JSON, nullable=True)  # breakdown of risk factors
    calculated_at = Column(DateTime, default=datetime.utcnow)

    worker = relationship("Worker", back_populates="premium_calculations")


class PayoutHistory(Base):
    __tablename__ = "payout_history"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, ForeignKey("claims.id"), nullable=False)
    worker_id = Column(Integer, ForeignKey("workers.id"), nullable=False)
    amount = Column(Float, nullable=False)
    upi_id = Column(String(100), nullable=False)
    transaction_ref = Column(String(50), nullable=True)
    status = Column(String(20), default="initiated")  # initiated, processing, completed, failed
    initiated_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

    claim = relationship("Claim", back_populates="payout")
