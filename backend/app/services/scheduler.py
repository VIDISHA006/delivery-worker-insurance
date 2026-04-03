"""Background scheduler for trigger polling and claim review."""
from __future__ import annotations

from datetime import datetime, timedelta
import logging

try:
    from apscheduler.schedulers.background import BackgroundScheduler
except ModuleNotFoundError:  # pragma: no cover - optional runtime dependency
    BackgroundScheduler = None

from app.config import settings
from app.database import SessionLocal
from app.models import Claim, FraudTier, Trigger, TriggerStatus, TriggerType, ClaimStatus
from app.services.claims_processor import approve_claim, process_trigger_claims
from app.services.premium_engine import ZONE_PROFILES
from app.services.runtime_state import set_job_enabled, update_job_state
from app.services.trigger_engine import check_all_triggers

logger = logging.getLogger("gigbuddy.jobs")
SCHEDULER_IMPORT_ERROR = "APScheduler is not installed" if BackgroundScheduler is None else None
scheduler = BackgroundScheduler(timezone="Asia/Kolkata") if BackgroundScheduler else None


def _safe_float(value, default=0.0) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def poll_triggers_job() -> dict:
    """Poll all configured zones and create claims for newly fired triggers."""
    db = SessionLocal()
    fired_count = 0
    claims_processed = 0
    zones_checked = 0
    try:
        for zone in ZONE_PROFILES.keys():
            zones_checked += 1
            for result in check_all_triggers(zone):
                if not result.get("fired"):
                    continue

                trigger_type = TriggerType(result["trigger_type"])
                cutoff = datetime.utcnow() - timedelta(hours=6)
                existing = (
                    db.query(Trigger)
                    .filter(
                        Trigger.zone == zone,
                        Trigger.type == trigger_type,
                        Trigger.fired_at >= cutoff,
                        Trigger.status == TriggerStatus.ACTIVE,
                    )
                    .first()
                )
                if existing:
                    continue

                trigger = Trigger(
                    type=trigger_type,
                    zone=zone,
                    severity=result.get("severity", "moderate"),
                    primary_signal=result.get("primary_signal", ""),
                    primary_value=_safe_float(result.get("primary_value")),
                    secondary_signal=result.get("secondary_signal", ""),
                    secondary_value=_safe_float(result.get("secondary_value")),
                    payout_percentage=result.get("payout_percentage", 0.0),
                    status=TriggerStatus.ACTIVE,
                    description=result.get("description"),
                    fired_at=datetime.utcnow(),
                    raw_data=result.get("raw_data"),
                )
                db.add(trigger)
                db.flush()

                claims = process_trigger_claims(db, trigger)
                fired_count += 1
                claims_processed += len(claims)

        update_job_state(
            "trigger_poller",
            last_status="ok",
            zones_checked=zones_checked,
            triggers_fired=fired_count,
            claims_processed=claims_processed,
            error=None,
        )
        return {
            "status": "ok",
            "zones_checked": zones_checked,
            "triggers_fired": fired_count,
            "claims_processed": claims_processed,
        }
    except Exception as exc:  # pragma: no cover - runtime safeguard
        logger.exception("Trigger polling job failed")
        update_job_state(
            "trigger_poller",
            last_status="error",
            zones_checked=zones_checked,
            triggers_fired=fired_count,
            claims_processed=claims_processed,
            error=str(exc),
        )
        return {
            "status": "error",
            "zones_checked": zones_checked,
            "triggers_fired": fired_count,
            "claims_processed": claims_processed,
            "error": str(exc),
        }
    finally:
        db.close()


def review_pending_claims_job() -> dict:
    """Auto-release AMBER claims after a short hold window in demo/runtime mode."""
    db = SessionLocal()
    released = 0
    pending = 0
    try:
        review_cutoff = datetime.utcnow() - timedelta(minutes=15)
        amber_claims = (
            db.query(Claim)
            .filter(
                Claim.status == ClaimStatus.PENDING_REVIEW,
                Claim.fraud_tier == FraudTier.AMBER,
                Claim.created_at <= review_cutoff,
            )
            .all()
        )
        pending = (
            db.query(Claim)
            .filter(Claim.status == ClaimStatus.PENDING_REVIEW)
            .count()
        )
        for claim in amber_claims:
            approve_claim(db, claim.id, "Auto-released after background review window.")
            released += 1

        update_job_state(
            "claim_reviewer",
            last_status="ok",
            claims_released=released,
            claims_pending=max(pending - released, 0),
            error=None,
        )
        return {
            "status": "ok",
            "claims_released": released,
            "claims_pending": max(pending - released, 0),
        }
    except Exception as exc:  # pragma: no cover - runtime safeguard
        logger.exception("Claim reviewer job failed")
        update_job_state(
            "claim_reviewer",
            last_status="error",
            claims_released=released,
            claims_pending=pending,
            error=str(exc),
        )
        return {
            "status": "error",
            "claims_released": released,
            "claims_pending": pending,
            "error": str(exc),
        }
    finally:
        db.close()


def start_scheduler() -> None:
    """Start background jobs once per process."""
    if not settings.enable_background_jobs:
        set_job_enabled("trigger_poller", False)
        set_job_enabled("claim_reviewer", False)
        update_job_state("trigger_poller", last_status="disabled", error=None)
        update_job_state("claim_reviewer", last_status="disabled", error=None)
        return

    if scheduler is None:
        logger.warning("Background scheduler unavailable: %s", SCHEDULER_IMPORT_ERROR)
        set_job_enabled("trigger_poller", False)
        set_job_enabled("claim_reviewer", False)
        update_job_state("trigger_poller", last_status="unavailable", error=SCHEDULER_IMPORT_ERROR)
        update_job_state("claim_reviewer", last_status="unavailable", error=SCHEDULER_IMPORT_ERROR)
        return

    if scheduler.running:
        return

    scheduler.add_job(
        poll_triggers_job,
        "interval",
        seconds=settings.trigger_poll_interval_seconds,
        id="trigger_poller",
        max_instances=1,
        replace_existing=True,
    )
    scheduler.add_job(
        review_pending_claims_job,
        "interval",
        seconds=settings.claim_review_interval_seconds,
        id="claim_reviewer",
        max_instances=1,
        replace_existing=True,
    )
    scheduler.start()
    set_job_enabled("trigger_poller", True)
    set_job_enabled("claim_reviewer", True)
    logger.info("Background scheduler started")


def stop_scheduler() -> None:
    """Stop scheduler on shutdown."""
    if scheduler and scheduler.running:
        scheduler.shutdown(wait=False)
    set_job_enabled("trigger_poller", False)
    set_job_enabled("claim_reviewer", False)
