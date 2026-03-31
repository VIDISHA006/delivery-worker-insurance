"""Smoke tests for GigShield's public and protected API surface."""

from uuid import uuid4

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "healthy"
    assert body["service"] == "GigShield API"


def test_ready_endpoint_exposes_database_and_counts():
    response = client.get("/ready")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] in {"ready", "degraded"}
    assert "database" in body
    assert "counts" in body
    assert "runtime" in body


def test_metrics_endpoint_exposes_rate_limit_and_counts():
    response = client.get("/metrics")
    assert response.status_code == 200
    body = response.json()
    assert body["rate_limit_per_minute"] > 0
    assert "counts" in body


def test_trigger_poll_endpoint_runs_one_cycle():
    response = client.get("/api/triggers/poll")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] in {"ok", "error"}
    assert "zones_checked" in body


def test_claim_review_endpoint_runs_one_cycle():
    response = client.get("/api/claims/review")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] in {"ok", "error"}
    assert "claims_pending" in body


def test_support_endpoint_is_public():
    response = client.get("/api/auth/support")
    assert response.status_code == 200
    body = response.json()
    assert body["account_deletion_available_in_app"] is True
    assert "support_email" in body
    assert "integration_status" in body
    assert "weather" in body["integration_status"]


def test_register_requires_explicit_consent():
    response = client.post(
        "/api/auth/register",
        json={
            "name": "No Consent Worker",
            "phone": "9999999999",
            "zone": "Indiranagar",
            "city": "Bengaluru",
            "platform": "zepto",
            "vehicle_type": "2-wheeler",
            "accepted_terms": False,
            "accepted_privacy": False,
            "accepted_automated_decisions": False,
        },
    )
    assert response.status_code == 400


def test_register_returns_otp_session_metadata():
    unique_phone = f"9{uuid4().int % 10**9:09d}"
    response = client.post(
        "/api/auth/register",
        json={
            "name": "Consent Worker",
            "phone": unique_phone,
            "zone": "Indiranagar",
            "city": "Bengaluru",
            "platform": "zepto",
            "vehicle_type": "2-wheeler",
            "accepted_terms": True,
            "accepted_privacy": True,
            "accepted_automated_decisions": True,
        },
    )
    assert response.status_code == 200
    body = response.json()
    assert "otp_session" in body
    assert body["otp_session"]["session_id"]
    assert body["otp_session"]["expires_in"] > 0


def test_admin_dashboard_requires_authentication():
    response = client.get("/api/admin/dashboard")
    assert response.status_code == 401


def test_worker_profile_requires_authentication():
    response = client.get("/api/auth/me")
    assert response.status_code == 401
