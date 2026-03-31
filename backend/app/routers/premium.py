"""Dynamic Premium Calculation Router."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Worker, PremiumCalculation
from app.schemas import PremiumCalculateRequest, PremiumResponse
from app.services.premium_engine import (
    calculate_premium, get_all_zone_premiums, ZONE_PROFILES
)

router = APIRouter(prefix="/api/premium", tags=["Premium"])


@router.post("/calculate")
def calculate_zone_premium(data: PremiumCalculateRequest, db: Session = Depends(get_db)):
    """Calculate dynamic premium for a zone using XGBoost risk model."""
    result = calculate_premium(data.zone, data.week_of_year)

    # Store calculation in DB
    calc = PremiumCalculation(
        worker_id=data.worker_id,
        zone=data.zone,
        risk_score=result["risk_score"],
        base_premium=result["base_premium"],
        zone_multiplier=result["zone_multiplier"],
        seasonal_factor=result["seasonal_factor"],
        final_premium=result["final_premium"],
        factors=result["factors"],
    )
    db.add(calc)
    db.commit()

    return result


@router.get("/zones")
def get_all_premiums():
    """Get current premiums for all zones."""
    return get_all_zone_premiums()


@router.get("/factors/{zone}")
def get_zone_factors(zone: str):
    """Get detailed risk factors for a specific zone."""
    result = calculate_premium(zone)
    profile = ZONE_PROFILES.get(zone)

    return {
        "zone": zone,
        "premium": result,
        "profile": profile,
        "explanation": {
            "model": "XGBoost Gradient Boosted Decision Tree",
            "training_data": "3 years IMD weather history + CPCB AQI records + BBMP ward-level flood frequency",
            "features_used": len(result["factors"]),
            "retraining_frequency": "Monthly on updated IMD and CPCB data",
        },
    }


@router.get("/comparison")
def compare_zone_premiums():
    """Compare premiums across all zones for visualization."""
    all_premiums = get_all_zone_premiums()
    return {
        "zones": [p["zone"] for p in all_premiums],
        "premiums": [p["final_premium"] for p in all_premiums],
        "risk_scores": [p["risk_score"] for p in all_premiums],
        "multipliers": [p["zone_multiplier"] for p in all_premiums],
        "base_premium": 142.0,
        "min_premium": min(p["final_premium"] for p in all_premiums),
        "max_premium": max(p["final_premium"] for p in all_premiums),
    }
