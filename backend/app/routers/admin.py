"""Admin Dashboard Router — KPIs, analytics, review queue."""
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models import (
    Worker, Policy, Claim, Trigger, PayoutHistory,
    PolicyStatus, ClaimStatus, FraudTier, TriggerStatus,
)
from app.security import get_current_admin
from app.services.provider_gateway import get_integration_status
from app.services.runtime_state import get_runtime_state
from app.services.external_apis import ZONE_COORDS, get_zone_status

router = APIRouter(prefix="/api/admin", tags=["Admin"])


def _zone_trigger_matches(zone_status: dict) -> list[dict]:
    weather = zone_status.get("weather", {})
    aqi = zone_status.get("aqi", {})
    traffic = zone_status.get("traffic", {})
    curfew = zone_status.get("curfew", {})
    flood = zone_status.get("flood", {})

    matches: list[dict] = []

    if (weather.get("rainfall_6hr_mm") or 0) >= 50 and (traffic.get("congestion_level") or 0) >= 4:
        matches.append({
            "type": "rainfall",
            "name": "Heavy Rainfall",
            "severity": "critical",
            "payout_pct": 0.80,
            "reason": f"{weather.get('rainfall_6hr_mm', 0)}mm rainfall + traffic level {traffic.get('congestion_level', 0)}",
        })
    if (aqi.get("aqi") or 0) >= 300 and (weather.get("wind_speed_kmh") or 999) < 5:
        matches.append({
            "type": "aqi",
            "name": "Hazardous AQI",
            "severity": "critical",
            "payout_pct": 0.70,
            "reason": f"AQI {aqi.get('aqi', 0)} + wind {weather.get('wind_speed_kmh', 0)} km/h",
        })
    if (weather.get("temperature_c") or 0) >= 40:
        matches.append({
            "type": "heat",
            "name": "Extreme Heat",
            "severity": "elevated",
            "payout_pct": 0.60,
            "reason": f"Temperature {weather.get('temperature_c', 0)}°C",
        })
    if curfew.get("alert_active") or curfew.get("gazette_confirmed"):
        matches.append({
            "type": "curfew",
            "name": "Curfew / Strike",
            "severity": "critical",
            "payout_pct": 1.00,
            "reason": curfew.get("type") or "Civic disruption advisory",
        })
    if (flood.get("water_level_m") or 0) >= 0.5 and (traffic.get("congestion_level") or 0) >= 4:
        matches.append({
            "type": "flooding",
            "name": "Urban Flooding",
            "severity": "critical",
            "payout_pct": 0.90,
            "reason": f"Water level {flood.get('water_level_m', 0)}m + traffic level {traffic.get('congestion_level', 0)}",
        })

    return matches


def _zone_composite_score(zone_status: dict) -> int:
    weather = zone_status.get("weather", {})
    aqi = zone_status.get("aqi", {})
    traffic = zone_status.get("traffic", {})
    flood = zone_status.get("flood", {})

    rainfall_component = min((weather.get("rainfall_6hr_mm") or 0) / 50, 1.6)
    aqi_component = min((aqi.get("aqi") or 0) / 300, 1.4)
    traffic_component = min((traffic.get("congestion_level") or 0) / 5, 1.0)
    flood_component = min((flood.get("water_level_m") or 0) / 0.5, 1.5)
    heat_component = min((weather.get("temperature_c") or 0) / 40, 1.2)

    weighted = (
        rainfall_component * 0.28
        + aqi_component * 0.24
        + traffic_component * 0.18
        + flood_component * 0.20
        + heat_component * 0.10
    )
    return max(0, min(100, round(weighted * 100)))


def _zone_status_band(score: int) -> str:
    if score >= 70:
        return "critical"
    if score >= 45:
        return "elevated"
    return "normal"


@router.get("/dashboard")
def get_dashboard_kpis(
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin),
):
    """Get all 8 dashboard KPIs."""
    total_workers = db.query(Worker).count()
    active_policies = db.query(Policy).filter(Policy.status == PolicyStatus.ACTIVE).count()
    total_policies = db.query(Policy).count()

    total_claims = db.query(Claim).count()
    claims_paid = db.query(Claim).filter(Claim.status == ClaimStatus.PAID).count()
    claims_pending = db.query(Claim).filter(Claim.status == ClaimStatus.PENDING_REVIEW).count()
    claims_rejected = db.query(Claim).filter(Claim.status == ClaimStatus.REJECTED).count()
    claims_auto_approved = db.query(Claim).filter(Claim.status == ClaimStatus.AUTO_APPROVED).count()

    total_premiums = db.query(func.sum(Policy.total_premiums_paid)).scalar() or 0
    total_payouts = db.query(func.sum(PayoutHistory.amount)).scalar() or 0

    # Combined Loss Ratio
    clr = round((total_payouts / total_premiums * 100), 1) if total_premiums > 0 else 0

    # Avg payout latency (mock: ~1.5 hrs for demo)
    avg_latency = 1.5

    # Fraud detection rate
    fraud_flagged = db.query(Claim).filter(Claim.fraud_tier.in_([FraudTier.AMBER, FraudTier.RED])).count()
    fraud_rate = round((fraud_flagged / total_claims * 100), 1) if total_claims > 0 else 0

    # Renewal rate (mock based on active vs total)
    renewal_rate = round((active_policies / total_policies * 100), 1) if total_policies > 0 else 0

    # Active triggers
    active_triggers = db.query(Trigger).filter(Trigger.status == TriggerStatus.ACTIVE).count()

    # Zones covered
    zones = db.query(func.count(func.distinct(Worker.zone))).scalar() or 0

    return {
        "total_workers": total_workers,
        "active_policies": active_policies,
        "total_claims": total_claims,
        "claims_paid": claims_paid,
        "claims_pending": claims_pending,
        "claims_rejected": claims_rejected,
        "claims_auto_approved": claims_auto_approved,
        "total_premiums_collected": round(total_premiums, 2),
        "total_claims_amount": round(total_payouts, 2),
        "combined_loss_ratio": clr,
        "avg_payout_latency_hours": avg_latency,
        "fraud_detection_rate": fraud_rate,
        "policy_renewal_rate": renewal_rate,
        "premium_collection_rate": 96.5,  # Mock high collection rate
        "active_triggers": active_triggers,
        "zones_covered": zones,
        "runtime": get_runtime_state(),
        "integrations": get_integration_status(),
    }


@router.get("/claims/queue")
def get_claims_queue(
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin),
):
    """Get claims requiring manual review, sorted by fraud tier."""
    pending = (
        db.query(Claim, Worker, Trigger)
        .join(Worker, Claim.worker_id == Worker.id)
        .join(Trigger, Claim.trigger_id == Trigger.id)
        .filter(Claim.status == ClaimStatus.PENDING_REVIEW)
        .order_by(Claim.fraud_score.desc())
        .all()
    )
    return {
        "total_pending": len(pending),
        "claims": [
            {
                "id": c.id,
                "worker_name": w.name,
                "worker_phone": w.phone,
                "zone": w.zone,
                "trigger_type": t.type.value,
                "trigger_severity": t.severity,
                "amount": c.amount,
                "fraud_score": c.fraud_score,
                "fraud_tier": c.fraud_tier.value,
                "fraud_details": c.fraud_details,
                "created_at": c.created_at.isoformat() if c.created_at else None,
            }
            for c, w, t in pending
        ],
    }


@router.get("/analytics")
def get_analytics(
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin),
):
    """Get analytics data for charts."""
    # Zone distribution
    zone_data = (
        db.query(Worker.zone, func.count(Worker.id))
        .group_by(Worker.zone)
        .all()
    )

    # Claims by type
    trigger_data = (
        db.query(Trigger.type, func.count(Trigger.id))
        .group_by(Trigger.type)
        .all()
    )

    # Claims by fraud tier
    fraud_data = (
        db.query(Claim.fraud_tier, func.count(Claim.id))
        .group_by(Claim.fraud_tier)
        .all()
    )

    # Premium distribution
    from app.services.premium_engine import get_all_zone_premiums
    premiums = get_all_zone_premiums()

    today = datetime.utcnow().date()
    daily_activity = []
    for offset in range(6, -1, -1):
        day = today - timedelta(days=offset)
        start = datetime.combine(day, datetime.min.time())
        end = start + timedelta(days=1)
        daily_activity.append({
            "date": day.isoformat(),
            "claims": db.query(Claim).filter(Claim.created_at >= start, Claim.created_at < end).count(),
            "triggers": db.query(Trigger).filter(Trigger.fired_at >= start, Trigger.fired_at < end).count(),
            "payouts": float(db.query(func.sum(PayoutHistory.amount)).filter(PayoutHistory.initiated_at >= start, PayoutHistory.initiated_at < end).scalar() or 0),
            "premiums": float(db.query(func.sum(Policy.total_premiums_paid)).filter(Policy.created_at >= start, Policy.created_at < end).scalar() or 0),
        })

    claim_pipeline = {
        "paid": db.query(Claim).filter(Claim.status == ClaimStatus.PAID).count(),
        "auto_approved": db.query(Claim).filter(Claim.status == ClaimStatus.AUTO_APPROVED).count(),
        "pending_review": db.query(Claim).filter(Claim.status == ClaimStatus.PENDING_REVIEW).count(),
        "rejected": db.query(Claim).filter(Claim.status == ClaimStatus.REJECTED).count(),
    }

    zone_heatmap = []
    for zone_name, workers in zone_data:
        zone_triggers = db.query(Trigger).filter(Trigger.zone == zone_name).count()
        zone_claims = (
            db.query(Claim)
            .join(Worker, Claim.worker_id == Worker.id)
            .filter(Worker.zone == zone_name)
            .count()
        )
        zone_heatmap.append({
            "zone": zone_name,
            "workers": workers,
            "triggers": zone_triggers,
            "claims": zone_claims,
        })

    return {
        "zone_distribution": [
            {"zone": z, "workers": c} for z, c in zone_data
        ],
        "trigger_frequency": [
            {"type": t.value if hasattr(t, 'value') else str(t), "count": c}
            for t, c in trigger_data
        ],
        "fraud_distribution": [
            {"tier": t.value if hasattr(t, 'value') else str(t), "count": c}
            for t, c in fraud_data
        ],
        "premium_by_zone": [
            {"zone": p["zone"], "premium": p["final_premium"], "risk_score": p["risk_score"]}
            for p in premiums
        ],
        "daily_activity": daily_activity,
        "claim_pipeline": claim_pipeline,
        "zone_heatmap": zone_heatmap,
        "integrations": get_integration_status(),
        "runtime": get_runtime_state(),
    }


@router.get("/integrations/status")
def get_admin_integration_status(_: dict = Depends(get_current_admin)):
    """Expose integration and background-job readiness for the admin portal."""
    return {
        "integrations": get_integration_status(),
        "runtime": get_runtime_state(),
    }


@router.get("/live-zone-intelligence")
def get_live_zone_intelligence(
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin),
):
    """Aggregate live weather, AQI, traffic, and flood data for all monitored zones."""
    worker_counts = dict(
        db.query(Worker.zone, func.count(Worker.id))
        .group_by(Worker.zone)
        .all()
    )
    active_policy_counts = dict(
        db.query(Worker.zone, func.count(Policy.id))
        .join(Worker, Policy.worker_id == Worker.id)
        .filter(Policy.status == PolicyStatus.ACTIVE)
        .group_by(Worker.zone)
        .all()
    )
    open_claim_counts = dict(
        db.query(Worker.zone, func.count(Claim.id))
        .join(Worker, Claim.worker_id == Worker.id)
        .filter(Claim.status.in_([ClaimStatus.PENDING_REVIEW, ClaimStatus.AUTO_APPROVED, ClaimStatus.PAID]))
        .group_by(Worker.zone)
        .all()
    )

    zone_rows = []
    live_feed_zones = 0
    with ThreadPoolExecutor(max_workers=min(8, max(1, len(ZONE_COORDS)))) as executor:
        zone_statuses = {
            zone_name: zone_status
            for zone_name, zone_status in zip(
                ZONE_COORDS.keys(),
                executor.map(get_zone_status, ZONE_COORDS.keys()),
            )
        }

    for zone_name, coords in ZONE_COORDS.items():
        zone_status = zone_statuses.get(zone_name, {})
        matches = _zone_trigger_matches(zone_status)
        score = _zone_composite_score(zone_status)
        band = _zone_status_band(score)

        feed_apis = [
            zone_status.get("weather", {}).get("api"),
            zone_status.get("aqi", {}).get("api"),
            zone_status.get("traffic", {}).get("api"),
            zone_status.get("flood", {}).get("api"),
        ]
        live_signal_count = sum(1 for api_name in feed_apis if isinstance(api_name, str) and api_name.endswith("_live"))
        if live_signal_count:
            live_feed_zones += 1

        zone_rows.append({
            "zone": zone_name,
            "coordinates": coords,
            "workers": int(worker_counts.get(zone_name, 0) or 0),
            "active_policies": int(active_policy_counts.get(zone_name, 0) or 0),
            "open_claims": int(open_claim_counts.get(zone_name, 0) or 0),
            "composite_risk_pct": score,
            "status": band,
            "live_signal_count": live_signal_count,
            "live_triggers": matches,
            "weather": {
                "rainfall_6hr_mm": zone_status.get("weather", {}).get("rainfall_6hr_mm", 0),
                "temperature_c": zone_status.get("weather", {}).get("temperature_c", 0),
                "wind_speed_kmh": zone_status.get("weather", {}).get("wind_speed_kmh", 0),
                "source": zone_status.get("weather", {}).get("source"),
                "api": zone_status.get("weather", {}).get("api"),
                "timestamp": zone_status.get("weather", {}).get("timestamp"),
            },
            "aqi": {
                "aqi": zone_status.get("aqi", {}).get("aqi", 0),
                "category": zone_status.get("aqi", {}).get("category"),
                "source": zone_status.get("aqi", {}).get("source"),
                "api": zone_status.get("aqi", {}).get("api"),
                "timestamp": zone_status.get("aqi", {}).get("timestamp"),
            },
            "traffic": {
                "congestion_level": zone_status.get("traffic", {}).get("congestion_level", 0),
                "estimated_delay_minutes": zone_status.get("traffic", {}).get("estimated_delay_minutes", 0),
                "source": zone_status.get("traffic", {}).get("source"),
                "api": zone_status.get("traffic", {}).get("api"),
            },
            "flood": {
                "water_level_m": zone_status.get("flood", {}).get("water_level_m", 0),
                "alert_level": zone_status.get("flood", {}).get("alert_level"),
                "source": zone_status.get("flood", {}).get("source"),
                "api": zone_status.get("flood", {}).get("api"),
            },
        })

    zone_rows.sort(key=lambda item: item["composite_risk_pct"], reverse=True)

    return {
        "generated_at": datetime.utcnow().isoformat(),
        "summary": {
            "zones_monitored": len(zone_rows),
            "zones_with_live_feeds": live_feed_zones,
            "critical_zones": sum(1 for row in zone_rows if row["status"] == "critical"),
            "elevated_zones": sum(1 for row in zone_rows if row["status"] == "elevated"),
            "workers_monitored": sum(row["workers"] for row in zone_rows),
        },
        "zones": zone_rows,
    }


@router.get("/payouts")
def get_payout_history(
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin),
):
    """Get all payout transactions."""
    payouts = (
        db.query(PayoutHistory, Worker)
        .join(Worker, PayoutHistory.worker_id == Worker.id)
        .order_by(PayoutHistory.initiated_at.desc())
        .all()
    )
    return [
        {
            "id": p.id,
            "worker_name": w.name,
            "worker_zone": w.zone,
            "amount": p.amount,
            "upi_id": p.upi_id,
            "transaction_ref": p.transaction_ref,
            "status": p.status,
            "initiated_at": p.initiated_at.isoformat() if p.initiated_at else None,
            "completed_at": p.completed_at.isoformat() if p.completed_at else None,
        }
        for p, w in payouts
    ]
