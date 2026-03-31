"""Seed database with demo data for GigShield Phase 2."""
import random
import string
from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from app.database import engine, SessionLocal, Base
from app.models import (
    Worker, Policy, Claim, Trigger, PayoutHistory, PremiumCalculation,
    Platform, RiskTier, PolicyStatus, ClaimStatus, FraudTier,
    TriggerType, TriggerStatus,
)
from app.services.premium_engine import calculate_premium, get_risk_tier


def seed_database():
    """Populate database with realistic demo data."""
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Check if already seeded
    if db.query(Worker).count() > 0:
        print("⚠️  Database already seeded. Skipping.")
        db.close()
        return

    print("🌱 Seeding GigShield database...")

    # ── 1. Create Workers ─────────────────────────────────────────
    workers_data = [
        {
            "name": "Ravi Kumar",
            "phone": "9876543210",
            "zone": "Indiranagar",
            "platform": Platform.ZEPTO,
            "partner_id": "ZPT-BLR-4521",
            "upi_id": "ravikumar@upi",
            "weekly_income": 5200.0,
            "vehicle_type": "2-wheeler",
        },
        {
            "name": "Priya Sharma",
            "phone": "9876543211",
            "zone": "Koramangala",
            "platform": Platform.BLINKIT,
            "partner_id": "BLK-BLR-8823",
            "upi_id": "priyasharma@upi",
            "weekly_income": 4800.0,
            "vehicle_type": "2-wheeler",
        },
        {
            "name": "Arjun Reddy",
            "phone": "9876543212",
            "zone": "Whitefield",
            "platform": Platform.ZEPTO,
            "partner_id": "ZPT-BLR-7734",
            "upi_id": "arjunreddy@upi",
            "weekly_income": 5500.0,
            "vehicle_type": "2-wheeler",
        },
        {
            "name": "Meena Devi",
            "phone": "9876543213",
            "zone": "Rajajinagar",
            "platform": Platform.DUNZO,
            "partner_id": "DNZ-BLR-3312",
            "upi_id": "meenadevi@upi",
            "weekly_income": 4500.0,
            "vehicle_type": "2-wheeler",
        },
        {
            "name": "Suresh Babu",
            "phone": "9876543214",
            "zone": "Indiranagar",
            "platform": Platform.SWIGGY_INSTAMART,
            "partner_id": "SWG-BLR-9901",
            "upi_id": "sureshbabu@upi",
            "weekly_income": 5000.0,
            "vehicle_type": "2-wheeler",
        },
        {
            "name": "Lakshmi Nair",
            "phone": "9876543215",
            "zone": "HSR Layout",
            "platform": Platform.BLINKIT,
            "partner_id": "BLK-BLR-6645",
            "upi_id": "lakshminnair@upi",
            "weekly_income": 4700.0,
            "vehicle_type": "2-wheeler",
        },
        {
            "name": "Deepak Joshi",
            "phone": "9876543216",
            "zone": "Marathahalli",
            "platform": Platform.ZEPTO,
            "partner_id": "ZPT-BLR-5567",
            "upi_id": "deepakjoshi@upi",
            "weekly_income": 5100.0,
            "vehicle_type": "2-wheeler",
        },
        {
            "name": "Fatima Begum",
            "phone": "9876543217",
            "zone": "Electronic City",
            "platform": Platform.DUNZO,
            "partner_id": "DNZ-BLR-2234",
            "upi_id": "fatimabegum@upi",
            "weekly_income": 4600.0,
            "vehicle_type": "2-wheeler",
        },
    ]

    workers = []
    for wd in workers_data:
        premium = calculate_premium(wd["zone"])
        risk_tier = get_risk_tier(premium["risk_score"])

        w = Worker(
            name=wd["name"],
            phone=wd["phone"],
            zone=wd["zone"],
            city="Bengaluru",
            platform=wd["platform"],
            partner_id=wd["partner_id"],
            upi_id=wd["upi_id"],
            weekly_income=wd["weekly_income"],
            vehicle_type=wd["vehicle_type"],
            risk_tier=RiskTier(risk_tier),
            aadhaar_verified=True,
            phone_verified=True,
            onboarding_complete=True,
            terms_accepted_at=datetime.utcnow(),
            privacy_accepted_at=datetime.utcnow(),
            ai_notice_accepted_at=datetime.utcnow(),
        )
        db.add(w)
        workers.append(w)

    db.flush()
    print(f"   ✅ Created {len(workers)} workers")

    # ── 2. Create Policies ────────────────────────────────────────
    policies = []
    for w in workers:
        premium = calculate_premium(w.zone)
        weeks = random.randint(3, 12)

        p = Policy(
            worker_id=w.id,
            plan_type="standard",
            weekly_premium=premium["final_premium"],
            coverage_amount=round(premium["final_premium"] * 4.5, 2),
            status=PolicyStatus.ACTIVE,
            auto_renew=True,
            start_date=datetime.utcnow() - timedelta(weeks=weeks),
            end_date=datetime.utcnow() + timedelta(days=random.randint(1, 6)),
            weeks_active=weeks,
            total_premiums_paid=round(premium["final_premium"] * weeks, 2),
        )
        db.add(p)
        policies.append(p)

    db.flush()
    print(f"   ✅ Created {len(policies)} policies")

    # ── 3. Create Historical Triggers ─────────────────────────────
    trigger_scenarios = [
        {
            "type": TriggerType.RAINFALL,
            "zone": "Indiranagar",
            "severity": "severe",
            "primary_signal": "IMD Rainfall",
            "primary_value": 68.5,
            "secondary_signal": "Google Maps Congestion",
            "secondary_value": 5,
            "payout_pct": 0.80,
            "description": "Heavy rainfall: 68.5mm in 6hrs, Maps Level 5",
            "days_ago": 5,
        },
        {
            "type": TriggerType.AQI,
            "zone": "Koramangala",
            "severity": "severe",
            "primary_signal": "CPCB AQI",
            "primary_value": 342,
            "secondary_signal": "IMD Wind Speed",
            "secondary_value": 3.2,
            "payout_pct": 0.70,
            "description": "Hazardous AQI: 342, Wind 3.2 km/h (no dispersal)",
            "days_ago": 12,
        },
        {
            "type": TriggerType.HEAT,
            "zone": "Rajajinagar",
            "severity": "extreme",
            "primary_signal": "IMD Temperature",
            "primary_value": 43.2,
            "secondary_signal": "CPCB Heat Index",
            "secondary_value": 48.5,
            "payout_pct": 0.60,
            "description": "Extreme heat: 43.2°C, Heat Index Extreme",
            "days_ago": 20,
        },
        {
            "type": TriggerType.FLOODING,
            "zone": "Indiranagar",
            "severity": "severe",
            "primary_signal": "BBMP Flood Sensor",
            "primary_value": 0.85,
            "secondary_signal": "Google Maps Congestion",
            "secondary_value": 5,
            "payout_pct": 0.90,
            "description": "Urban flooding: 0.85m waterlogging, roads impassable",
            "days_ago": 8,
        },
        {
            "type": TriggerType.CURFEW,
            "zone": "Marathahalli",
            "severity": "severe",
            "primary_signal": "District Admin Alert",
            "primary_value": 1,
            "secondary_signal": "News API",
            "secondary_value": 1,
            "payout_pct": 1.00,
            "description": "Bandh declared: District Commissioner order",
            "days_ago": 15,
        },
    ]

    triggers = []
    for ts in trigger_scenarios:
        t = Trigger(
            type=ts["type"],
            zone=ts["zone"],
            severity=ts["severity"],
            primary_signal=ts["primary_signal"],
            primary_value=ts["primary_value"],
            secondary_signal=ts["secondary_signal"],
            secondary_value=ts["secondary_value"],
            payout_percentage=ts["payout_pct"],
            status=TriggerStatus.RESOLVED,
            description=ts["description"],
            fired_at=datetime.utcnow() - timedelta(days=ts["days_ago"]),
            resolved_at=datetime.utcnow() - timedelta(days=ts["days_ago"]) + timedelta(hours=6),
        )
        db.add(t)
        triggers.append(t)

    db.flush()
    print(f"   ✅ Created {len(triggers)} historical triggers")

    # ── 4. Create Claims & Payouts ────────────────────────────────
    claims_count = 0
    for trigger in triggers:
        # Find workers in the trigger zone
        zone_workers = [w for w in workers if w.zone == trigger.zone]
        zone_policies = [p for p in policies if p.worker_id in [w.id for w in zone_workers]]

        for policy in zone_policies:
            worker = next(w for w in workers if w.id == policy.worker_id)
            payout_amount = round(policy.weekly_premium * 4.5 * trigger.payout_percentage, 2)

            # Mix of fraud tiers for demo
            rand_val = random.random()
            if rand_val < 0.70:
                fraud_tier = FraudTier.GREEN
                fraud_score = round(random.uniform(0.05, 0.40), 4)
                claim_status = ClaimStatus.PAID
            elif rand_val < 0.90:
                fraud_tier = FraudTier.AMBER
                fraud_score = round(random.uniform(0.45, 0.65), 4)
                claim_status = random.choice([ClaimStatus.PAID, ClaimStatus.PENDING_REVIEW])
            else:
                fraud_tier = FraudTier.RED
                fraud_score = round(random.uniform(0.72, 0.95), 4)
                claim_status = ClaimStatus.PENDING_REVIEW

            claim = Claim(
                policy_id=policy.id,
                trigger_id=trigger.id,
                worker_id=worker.id,
                amount=payout_amount,
                fraud_score=fraud_score,
                fraud_tier=fraud_tier,
                fraud_details={
                    "checks_passed": ["Zone verification: PASS", "Timing check: PASS"],
                    "flags": [] if fraud_tier == FraudTier.GREEN else [
                        {"rule": "ELEVATED_FREQUENCY", "severity": "medium"}
                    ],
                },
                status=claim_status,
                created_at=trigger.fired_at + timedelta(minutes=random.randint(5, 45)),
                paid_at=trigger.fired_at + timedelta(hours=random.randint(1, 2)) if claim_status == ClaimStatus.PAID else None,
            )
            db.add(claim)
            db.flush()
            claims_count += 1

            # Create payout for paid claims
            if claim_status == ClaimStatus.PAID:
                txn_ref = "GS" + "".join(random.choices(string.ascii_uppercase + string.digits, k=12))
                payout = PayoutHistory(
                    claim_id=claim.id,
                    worker_id=worker.id,
                    amount=payout_amount,
                    upi_id=worker.upi_id,
                    transaction_ref=txn_ref,
                    status="completed",
                    initiated_at=claim.paid_at - timedelta(minutes=10),
                    completed_at=claim.paid_at,
                )
                db.add(payout)

                # Update policy stats
                policy.total_claims_paid += payout_amount

    print(f"   ✅ Created {claims_count} claims with payouts")

    # ── 5. Store Premium Calculations ─────────────────────────────
    for w in workers:
        premium = calculate_premium(w.zone)
        calc = PremiumCalculation(
            worker_id=w.id,
            zone=w.zone,
            risk_score=premium["risk_score"],
            base_premium=premium["base_premium"],
            zone_multiplier=premium["zone_multiplier"],
            seasonal_factor=premium["seasonal_factor"],
            final_premium=premium["final_premium"],
            factors=premium["factors"],
        )
        db.add(calc)

    db.commit()
    db.close()
    print("🎉 Database seeded successfully!")


if __name__ == "__main__":
    seed_database()
