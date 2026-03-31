"""Trigger Monitoring & Simulation Router."""
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Trigger, TriggerType, TriggerStatus
from app.security import get_current_admin, require_cron_access
from app.services.trigger_engine import (
    check_trigger, check_all_triggers, get_trigger_config,
)
from app.services.claims_processor import process_trigger_claims
from app.services.external_apis import get_zone_status
from app.services.scheduler import poll_triggers_job

router = APIRouter(prefix="/api/triggers", tags=["Triggers"])


@router.post("/check/{zone}")
def check_zone_triggers(zone: str, db: Session = Depends(get_db)):
    """Check all 5 triggers for a zone (simulates 15-min polling cycle)."""
    results = check_all_triggers(zone)
    fired_triggers = [r for r in results if r["fired"]]
    return {
        "zone": zone,
        "checked_at": datetime.utcnow().isoformat(),
        "triggers_checked": len(results),
        "triggers_fired": len(fired_triggers),
        "results": results,
    }


@router.get("/poll")
def poll_triggers(request: Request, _: None = Depends(require_cron_access)):
    """Run one trigger polling cycle for Vercel Cron or manual operational checks."""
    result = poll_triggers_job()
    return {
        "invoked_at": datetime.utcnow().isoformat(),
        "invoker": "vercel-cron" if request.headers.get("user-agent", "").lower().startswith("vercel-cron") else "manual",
        **result,
    }


@router.post("/simulate/{trigger_type}")
def simulate_trigger(
    trigger_type: str,
    zone: str = "Indiranagar",
    severity: str = "severe",
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin),
):
    """Simulate a trigger event for demo — fires trigger and processes claims."""
    # Validate trigger type
    try:
        tt = TriggerType(trigger_type)
    except ValueError:
        raise HTTPException(400, f"Invalid trigger type. Use: {[t.value for t in TriggerType]}")

    # Run trigger check (always fires in simulation mode)
    result = check_trigger(zone, trigger_type)

    if not result.get("fired"):
        # Force fire for demo
        result["fired"] = True
        result["severity"] = severity

    # Store trigger in DB — safely convert values to float for DB
    def _safe_float(val, default=0):
        if val is None:
            return default
        try:
            return float(val)
        except (ValueError, TypeError):
            return default

    trigger = Trigger(
        type=tt,
        zone=zone,
        severity=result.get("severity", severity),
        primary_signal=result.get("primary_signal", ""),
        primary_value=_safe_float(result.get("primary_value")),
        secondary_signal=result.get("secondary_signal", ""),
        secondary_value=_safe_float(result.get("secondary_value")),
        payout_percentage=result.get("payout_percentage", 0.8),
        status=TriggerStatus.ACTIVE,
        description=result.get("description", ""),
        fired_at=datetime.utcnow(),
        raw_data=result.get("raw_data"),
    )
    db.add(trigger)
    db.flush()

    # Process zero-touch claims
    claims_processed = process_trigger_claims(db, trigger)

    db.commit()

    return {
        "trigger": {
            "id": trigger.id,
            "type": trigger_type,
            "zone": zone,
            "severity": trigger.severity,
            "payout_percentage": trigger.payout_percentage,
            "fired_at": trigger.fired_at.isoformat(),
            "primary": f"{result.get('primary_signal')}: {result.get('primary_value')}",
            "secondary": f"{result.get('secondary_signal')}: {result.get('secondary_value')}",
        },
        "claims_processed": len(claims_processed),
        "claims": claims_processed,
        "api_data": result.get("raw_data"),
    }


@router.get("/active")
def get_active_triggers(db: Session = Depends(get_db)):
    """Get currently active triggers."""
    triggers = (
        db.query(Trigger)
        .filter(Trigger.status == TriggerStatus.ACTIVE)
        .order_by(Trigger.fired_at.desc())
        .all()
    )
    return [
        {
            "id": t.id,
            "type": t.type.value,
            "zone": t.zone,
            "severity": t.severity,
            "payout_percentage": t.payout_percentage,
            "fired_at": t.fired_at.isoformat() if t.fired_at else None,
            "primary": f"{t.primary_signal}: {t.primary_value}",
            "secondary": f"{t.secondary_signal}: {t.secondary_value}",
        }
        for t in triggers
    ]


@router.get("/history")
def get_trigger_history(
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin),
):
    """Get trigger history."""
    triggers = db.query(Trigger).order_by(Trigger.fired_at.desc()).limit(50).all()
    return [
        {
            "id": t.id,
            "type": t.type.value,
            "zone": t.zone,
            "severity": t.severity,
            "payout_percentage": t.payout_percentage,
            "status": t.status.value,
            "fired_at": t.fired_at.isoformat() if t.fired_at else None,
            "description": t.description,
        }
        for t in triggers
    ]


@router.put("/{trigger_id}/resolve")
def resolve_trigger(
    trigger_id: int,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin),
):
    """Mark a trigger as resolved."""
    trigger = db.query(Trigger).filter(Trigger.id == trigger_id).first()
    if not trigger:
        raise HTTPException(404, "Trigger not found")

    trigger.status = TriggerStatus.RESOLVED
    trigger.resolved_at = datetime.utcnow()
    db.commit()

    return {"trigger_id": trigger.id, "status": "resolved"}


@router.get("/config")
def get_config(_: dict = Depends(get_current_admin)):
    """Get trigger configuration (thresholds, logic gates)."""
    return get_trigger_config()


@router.get("/zone-status/{zone}")
def get_zone_live_status(zone: str):
    """Get live status of all environmental signals for a zone."""
    return get_zone_status(zone)
