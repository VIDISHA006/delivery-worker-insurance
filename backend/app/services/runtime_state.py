"""Shared runtime state for job execution and provider visibility."""
from __future__ import annotations

from copy import deepcopy
from datetime import datetime

_runtime_state = {
    "jobs": {
        "trigger_poller": {
            "enabled": False,
            "last_run_at": None,
            "last_status": "idle",
            "zones_checked": 0,
            "triggers_fired": 0,
            "claims_processed": 0,
            "error": None,
        },
        "claim_reviewer": {
            "enabled": False,
            "last_run_at": None,
            "last_status": "idle",
            "claims_released": 0,
            "claims_pending": 0,
            "error": None,
        },
    },
    "integrations": {},
}


def update_job_state(job_name: str, **updates) -> None:
    """Update an in-memory job execution snapshot."""
    job = _runtime_state["jobs"].setdefault(job_name, {})
    job.update(updates)
    job["last_run_at"] = datetime.utcnow().isoformat()


def set_job_enabled(job_name: str, enabled: bool) -> None:
    """Mark a background job as enabled or disabled."""
    job = _runtime_state["jobs"].setdefault(job_name, {})
    job["enabled"] = enabled


def update_integrations(snapshot: dict) -> None:
    """Store the latest provider status snapshot."""
    _runtime_state["integrations"] = snapshot


def get_runtime_state() -> dict:
    """Return a copy safe for API responses."""
    return deepcopy(_runtime_state)
