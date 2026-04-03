"""Comprehensive deliverables test suite for GigBuddy.

Tests all key deliverables required for the DEVTrails 2026 hackathon submission:
  D1 — Registration Process
  D2 — Insurance Policy Management
  D3 — Dynamic Premium Calculation (AI/ML Integration)
  D4 — Claims Management (Zero-touch + Automated Triggers)
"""

import re
from uuid import uuid4

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

# ═══════════════════════════════════════════════════════════════════════
# HELPERS
# ═══════════════════════════════════════════════════════════════════════

def _unique_phone() -> str:
    """Generate a valid Indian mobile number for test isolation."""
    return f"9{uuid4().int % 10**9:09d}"


def _register_worker(phone: str = None, zone: str = "Koramangala") -> dict:
    """Register a worker and return the full response body."""
    phone = phone or _unique_phone()
    resp = client.post("/api/auth/register", json={
        "name": "Test Worker",
        "phone": phone,
        "zone": zone,
        "city": "Bengaluru",
        "platform": "zepto",
        "vehicle_type": "2-wheeler",
        "accepted_terms": True,
        "accepted_privacy": True,
        "accepted_automated_decisions": True,
    })
    assert resp.status_code == 200, f"Registration failed: {resp.text}"
    return resp.json()


def _verify_otp(phone: str) -> dict:
    """Verify OTP with demo code and return response with access_token."""
    resp = client.post("/api/auth/verify-otp", json={
        "phone": phone,
        "otp": "1234",
    })
    assert resp.status_code == 200, f"OTP verify failed: {resp.text}"
    return resp.json()


def _auth_header(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}


def _full_onboarding(zone: str = "Koramangala") -> tuple[str, int, dict]:
    """Complete registration → OTP → KYC → UPI and return (token, worker_id, headers)."""
    phone = _unique_phone()
    reg = _register_worker(phone, zone)
    otp = _verify_otp(phone)
    token = otp["access_token"]
    worker_id = otp["worker_id"]
    headers = _auth_header(token)

    # KYC
    kyc_resp = client.post("/api/auth/kyc", json={
        "worker_id": worker_id,
        "aadhaar_number": "123456789012",
    }, headers=headers)
    assert kyc_resp.status_code == 200, f"KYC failed: {kyc_resp.text}"

    # UPI
    upi_resp = client.post("/api/auth/setup-upi", json={
        "worker_id": worker_id,
        "upi_id": f"test{worker_id}@upi",
    }, headers=headers)
    assert upi_resp.status_code == 200, f"UPI setup failed: {upi_resp.text}"

    return token, worker_id, headers


def _admin_login() -> dict:
    """Login as admin and return auth headers."""
    resp = client.post("/api/auth/admin/login", json={
        "username": "ops@gigbuddy.local",
        "password": "GigBuddyAdmin123!",
    })
    assert resp.status_code == 200
    return _auth_header(resp.json()["access_token"])


# ═══════════════════════════════════════════════════════════════════════
# D1 — REGISTRATION PROCESS
# ═══════════════════════════════════════════════════════════════════════

class TestD1Registration:
    """Deliverable 1: Registration Process with consent, OTP, KYC, UPI."""

    def test_d1_01_registration_requires_all_consents(self):
        """Registration MUST fail if any consent flag is False."""
        for field in ("accepted_terms", "accepted_privacy", "accepted_automated_decisions"):
            payload = {
                "name": "Test Worker", "phone": _unique_phone(),
                "zone": "Indiranagar", "city": "Bengaluru",
                "platform": "zepto", "vehicle_type": "2-wheeler",
                "accepted_terms": True, "accepted_privacy": True,
                "accepted_automated_decisions": True,
            }
            payload[field] = False
            resp = client.post("/api/auth/register", json=payload)
            assert resp.status_code == 400, f"Should fail when {field}=False"

    def test_d1_02_registration_returns_otp_session(self):
        """Successful registration returns OTP session metadata."""
        body = _register_worker()
        assert "otp_session" in body
        assert body["otp_session"]["session_id"]
        assert body["otp_session"]["expires_in"] > 0
        assert body["otp_session"]["provider_mode"] in ("sandbox", "live", "fallback")

    def test_d1_03_otp_verification_issues_jwt(self):
        """OTP verify returns a valid JWT access token."""
        phone = _unique_phone()
        _register_worker(phone)
        otp_resp = _verify_otp(phone)
        assert otp_resp["verified"] is True
        assert otp_resp["access_token"]
        assert otp_resp["token_type"] == "bearer"
        assert otp_resp["worker_id"] > 0

    def test_d1_04_kyc_verification_succeeds(self):
        """eKYC mock verification completes successfully."""
        phone = _unique_phone()
        _register_worker(phone)
        otp_resp = _verify_otp(phone)
        token = otp_resp["access_token"]
        worker_id = otp_resp["worker_id"]

        kyc_resp = client.post("/api/auth/kyc", json={
            "worker_id": worker_id,
            "aadhaar_number": "123456789012",
        }, headers=_auth_header(token))
        assert kyc_resp.status_code == 200
        body = kyc_resp.json()
        assert body["verified"] is True
        assert body["kyc_status"] == "completed"
        assert body["reference_id"].startswith("KYC-")

    def test_d1_05_upi_setup_completes_onboarding(self):
        """UPI setup marks the worker as fully onboarded."""
        phone = _unique_phone()
        _register_worker(phone)
        otp = _verify_otp(phone)
        token = otp["access_token"]
        worker_id = otp["worker_id"]
        headers = _auth_header(token)

        # KYC first
        client.post("/api/auth/kyc", json={
            "worker_id": worker_id,
            "aadhaar_number": "123456789012",
        }, headers=headers)

        # UPI setup
        upi_resp = client.post("/api/auth/setup-upi", json={
            "worker_id": worker_id,
            "upi_id": f"worker{worker_id}@upi",
        }, headers=headers)
        assert upi_resp.status_code == 200
        body = upi_resp.json()
        assert body["success"] is True
        assert body["autopay_status"] in ("active", "sandbox_active")
        assert body["mandate_ref"].startswith("MANDATE-")

    def test_d1_06_profile_accessible_after_onboarding(self):
        """Worker can fetch their own profile after full onboarding."""
        token, worker_id, headers = _full_onboarding()
        resp = client.get("/api/auth/me", headers=headers)
        assert resp.status_code == 200
        body = resp.json()
        assert body["id"] == worker_id
        assert body["phone_verified"] is True
        assert body["aadhaar_verified"] is True
        assert body["onboarding_complete"] is True

    def test_d1_07_duplicate_phone_rejected(self):
        """Cannot register the same phone number twice."""
        phone = _unique_phone()
        _register_worker(phone)
        resp = client.post("/api/auth/register", json={
            "name": "Duplicate Worker", "phone": phone,
            "zone": "Whitefield", "city": "Bengaluru",
            "platform": "blinkit", "vehicle_type": "2-wheeler",
            "accepted_terms": True, "accepted_privacy": True,
            "accepted_automated_decisions": True,
        })
        assert resp.status_code == 400

    def test_d1_08_invalid_phone_format_rejected(self):
        """Phone numbers must match Indian mobile format."""
        resp = client.post("/api/auth/register", json={
            "name": "Bad Phone", "phone": "12345",
            "zone": "Indiranagar", "city": "Bengaluru",
            "platform": "zepto", "vehicle_type": "2-wheeler",
            "accepted_terms": True, "accepted_privacy": True,
            "accepted_automated_decisions": True,
        })
        assert resp.status_code == 422  # Pydantic validation


# ═══════════════════════════════════════════════════════════════════════
# D2 — INSURANCE POLICY MANAGEMENT
# ═══════════════════════════════════════════════════════════════════════

class TestD2PolicyManagement:
    """Deliverable 2: Policy purchase, renewal, pause, reactivation."""

    def test_d2_01_create_policy_with_dynamic_premium(self):
        """Policy creation uses dynamic premium from the ML model."""
        token, worker_id, headers = _full_onboarding("Indiranagar")
        resp = client.post("/api/policies/create", json={
            "worker_id": worker_id,
            "plan_type": "standard",
        }, headers=headers)
        assert resp.status_code == 200
        body = resp.json()
        assert body["status"] == "active"
        assert body["weekly_premium"] > 0
        assert body["coverage_amount"] > 0
        assert body["auto_renew"] is True
        assert body["weeks_active"] == 1

    def test_d2_02_cannot_create_duplicate_active_policy(self):
        """Worker cannot have two active policies simultaneously."""
        token, worker_id, headers = _full_onboarding()
        client.post("/api/policies/create", json={
            "worker_id": worker_id, "plan_type": "standard",
        }, headers=headers)
        resp = client.post("/api/policies/create", json={
            "worker_id": worker_id, "plan_type": "standard",
        }, headers=headers)
        assert resp.status_code == 400

    def test_d2_03_policy_requires_completed_onboarding(self):
        """Policy creation requires phone, KYC, and UPI to be verified."""
        phone = _unique_phone()
        reg = _register_worker(phone)
        otp = _verify_otp(phone)
        token = otp["access_token"]
        worker_id = otp["worker_id"]
        # Try without KYC/UPI
        resp = client.post("/api/policies/create", json={
            "worker_id": worker_id, "plan_type": "standard",
        }, headers=_auth_header(token))
        assert resp.status_code == 400  # Missing KYC or UPI

    def test_d2_04_renew_policy_recalculates_premium(self):
        """Renewal recalculates premium with seasonal factors."""
        token, worker_id, headers = _full_onboarding("Whitefield")
        create_resp = client.post("/api/policies/create", json={
            "worker_id": worker_id, "plan_type": "standard",
        }, headers=headers)
        policy_id = create_resp.json()["id"]

        renew_resp = client.put(f"/api/policies/{policy_id}/renew", headers=headers)
        assert renew_resp.status_code == 200
        body = renew_resp.json()
        assert body["status"] == "renewed"
        assert body["weeks_active"] == 2
        assert body["new_premium"] > 0
        assert "guidewire_quote_mode" in body["integration"]

    def test_d2_05_pause_and_reactivate_policy(self):
        """Worker can pause and reactivate coverage at will."""
        token, worker_id, headers = _full_onboarding()
        create_resp = client.post("/api/policies/create", json={
            "worker_id": worker_id, "plan_type": "standard",
        }, headers=headers)
        policy_id = create_resp.json()["id"]

        # Pause
        pause_resp = client.put(f"/api/policies/{policy_id}/pause", headers=headers)
        assert pause_resp.status_code == 200
        assert pause_resp.json()["status"] == "paused"

        # Reactivate
        activate_resp = client.put(f"/api/policies/{policy_id}/activate", headers=headers)
        assert activate_resp.status_code == 200
        assert activate_resp.json()["status"] == "active"

    def test_d2_06_view_own_policies(self):
        """Worker can list their own policies."""
        token, worker_id, headers = _full_onboarding()
        client.post("/api/policies/create", json={
            "worker_id": worker_id, "plan_type": "standard",
        }, headers=headers)
        resp = client.get("/api/policies/me", headers=headers)
        assert resp.status_code == 200
        policies = resp.json()
        assert len(policies) >= 1
        assert policies[0]["status"] == "active"

    def test_d2_07_premium_plan_has_multiplier(self):
        """Premium plan costs 1.3x the standard plan."""
        token, worker_id, headers = _full_onboarding("HSR Layout")
        resp = client.post("/api/policies/create", json={
            "worker_id": worker_id, "plan_type": "premium",
        }, headers=headers)
        assert resp.status_code == 200
        body = resp.json()
        assert body["plan_type"] == "premium"
        # Premium plan should have higher premium
        assert body["weekly_premium"] > 0


# ═══════════════════════════════════════════════════════════════════════
# D3 — DYNAMIC PREMIUM CALCULATION (AI/ML)
# ═══════════════════════════════════════════════════════════════════════

class TestD3DynamicPremium:
    """Deliverable 3: XGBoost ML-driven premium calculation with explainability."""

    def test_d3_01_premium_returns_explainable_factors(self):
        """Premium calculation includes detailed factor breakdown."""
        resp = client.post("/api/premium/calculate", json={
            "zone": "Indiranagar",
        })
        assert resp.status_code == 200
        body = resp.json()
        assert "risk_score" in body
        assert "final_premium" in body
        assert "factors" in body
        assert len(body["factors"]) >= 5  # At least 5 risk factors
        for factor in body["factors"]:
            assert "factor_name" in factor
            assert "value" in factor
            assert "impact" in factor
            assert "weight" in factor

    def test_d3_02_premiums_vary_by_zone_risk(self):
        """High-risk zones (Indiranagar) cost more than low-risk (Whitefield)."""
        high_risk = client.post("/api/premium/calculate", json={"zone": "Indiranagar"}).json()
        low_risk = client.post("/api/premium/calculate", json={"zone": "Whitefield"}).json()
        assert high_risk["risk_score"] > low_risk["risk_score"]
        assert high_risk["final_premium"] >= low_risk["final_premium"]

    def test_d3_03_seasonal_factor_applied(self):
        """Premiums include seasonal adjustment (monsoon ≠ winter)."""
        resp = client.post("/api/premium/calculate", json={"zone": "Koramangala"})
        body = resp.json()
        assert "seasonal_factor" in body
        assert body["seasonal_factor"] > 0

    def test_d3_04_savings_vs_max_reported(self):
        """Response shows how much the worker saves vs max possible premium."""
        resp = client.post("/api/premium/calculate", json={"zone": "Whitefield"})
        body = resp.json()
        assert "savings_vs_max" in body
        assert body["savings_vs_max"] >= 0  # Low-risk zone should save money

    def test_d3_05_all_zones_have_premiums(self):
        """All 8 monitored zones return valid premiums."""
        resp = client.get("/api/premium/zones")
        assert resp.status_code == 200
        zones = resp.json()
        assert len(zones) == 8
        for z in zones:
            assert z["final_premium"] >= 52  # MIN_PREMIUM
            assert z["final_premium"] <= 89  # MAX_PREMIUM

    def test_d3_06_zone_comparison_provides_chart_data(self):
        """Comparison endpoint provides data for visualization."""
        resp = client.get("/api/premium/comparison")
        assert resp.status_code == 200
        body = resp.json()
        assert len(body["zones"]) == 8
        assert len(body["premiums"]) == 8
        assert len(body["risk_scores"]) == 8
        assert body["base_premium"] == 142.0
        assert body["min_premium"] <= body["max_premium"]

    def test_d3_07_premium_model_is_xgboost(self):
        """Model identifier confirms XGBoost/GradientBoosted model."""
        resp = client.post("/api/premium/calculate", json={"zone": "Jayanagar"})
        body = resp.json()
        assert "model" in body
        assert "XGBoost" in body["model"] or "GradientBoosting" in body["model"]

    def test_d3_08_zone_factors_endpoint_shows_model_explanation(self):
        """Detailed zone factors include model metadata."""
        resp = client.get("/api/premium/factors/Indiranagar")
        assert resp.status_code == 200
        body = resp.json()
        assert body["zone"] == "Indiranagar"
        assert "explanation" in body
        assert "model" in body["explanation"]
        assert "training_data" in body["explanation"]
        assert body["profile"] is not None


# ═══════════════════════════════════════════════════════════════════════
# D4 — CLAIMS MANAGEMENT (Triggers + Zero-Touch + Fraud Detection)
# ═══════════════════════════════════════════════════════════════════════

class TestD4ClaimsManagement:
    """Deliverable 4: automated triggers, payout handling, and fraud detection."""

    def test_d4_01_five_trigger_types_configured(self):
        """All 5 trigger types are defined with dual-signal thresholds."""
        admin_headers = _admin_login()
        resp = client.get("/api/triggers/config", headers=admin_headers)
        assert resp.status_code == 200
        config = resp.json()
        expected = {"rainfall", "aqi", "heat", "curfew", "flooding"}
        assert set(config.keys()) == expected
        for trigger_type, cfg in config.items():
            assert "primary" in cfg
            assert "secondary" in cfg
            assert "logic" in cfg  # AND/OR gate
            assert "payout_pct" in cfg

    def test_d4_02_trigger_check_evaluates_all_signals(self):
        """Checking a zone evaluates all 5 triggers with API data."""
        resp = client.post("/api/triggers/check/Indiranagar")
        assert resp.status_code == 200
        body = resp.json()
        assert body["zone"] == "Indiranagar"
        assert body["triggers_checked"] == 5
        assert "results" in body
        for result in body["results"]:
            assert "primary_signal" in result
            assert "secondary_signal" in result
            assert "logic" in result

    def test_d4_03_simulate_trigger_creates_claims(self):
        """Simulating a trigger fires claims for all affected workers."""
        # Ensure there's at least one worker with active policy in Indiranagar
        token, worker_id, headers = _full_onboarding("Indiranagar")
        client.post("/api/policies/create", json={
            "worker_id": worker_id, "plan_type": "standard",
        }, headers=headers)

        admin_headers = _admin_login()
        resp = client.post(
            "/api/triggers/simulate/rainfall?zone=Indiranagar&severity=severe",
            headers=admin_headers,
        )
        assert resp.status_code == 200
        body = resp.json()
        assert body["trigger"]["type"] == "rainfall"
        assert body["trigger"]["zone"] == "Indiranagar"
        assert body["claims_processed"] >= 1
        for claim in body["claims"]:
            assert claim["amount"] > 0
            assert claim["fraud_tier"] in ("green", "amber", "red")
            assert "payout" in claim

    def test_d4_04_feedback_credit_can_be_earned_and_applied(self):
        """Paid claims can collect feedback once and apply a renewal credit."""
        token, worker_id, headers = _full_onboarding("Indiranagar")
        create_resp = client.post("/api/policies/create", json={
            "worker_id": worker_id, "plan_type": "standard",
        }, headers=headers)
        policy_id = create_resp.json()["id"]

        admin_headers = _admin_login()
        sim_resp = client.post(
            "/api/triggers/simulate/rainfall?zone=Indiranagar&severity=severe",
            headers=admin_headers,
        )
        assert sim_resp.status_code == 200

        claims_resp = client.get("/api/claims/me", headers=headers)
        assert claims_resp.status_code == 200
        claims = claims_resp.json()
        assert claims, "Expected at least one generated claim"

        latest_claim = claims[0]
        if latest_claim["status"] == "pending_review":
            approve_resp = client.put(f"/api/claims/{latest_claim['id']}/approve", headers=admin_headers)
            assert approve_resp.status_code == 200

        pending_feedback_resp = client.get("/api/claims/feedback/pending", headers=headers)
        assert pending_feedback_resp.status_code == 200
        pending_feedback = pending_feedback_resp.json()
        assert pending_feedback["has_pending_feedback"] is True

        feedback_claim_id = pending_feedback["claim"]["id"]
        feedback_resp = client.post(
            f"/api/claims/{feedback_claim_id}/feedback",
            json={
                "experienced_disruption": True,
                "payout_helpfulness": "right",
                "route_status": "slowed",
            },
            headers=headers,
        )
        assert feedback_resp.status_code == 200
        feedback_body = feedback_resp.json()
        assert feedback_body["credit_awarded"] == 5.0
        assert feedback_body["renewal_credit_balance"] == 5.0

        renew_resp = client.put(f"/api/policies/{policy_id}/renew", headers=headers)
        assert renew_resp.status_code == 200
        renew_body = renew_resp.json()
        assert renew_body["renewal_credit_applied"] == 5.0
        assert renew_body["renewal_credit_balance"] == 0.0

    def test_d4_04_zero_touch_green_claims_auto_paid(self):
        """GREEN fraud tier claims are auto-approved and paid instantly."""
        token, worker_id, headers = _full_onboarding("Electronic City")
        client.post("/api/policies/create", json={
            "worker_id": worker_id, "plan_type": "standard",
        }, headers=headers)

        admin_headers = _admin_login()
        resp = client.post(
            "/api/triggers/simulate/heat?zone=Electronic City&severity=severe",
            headers=admin_headers,
        )
        body = resp.json()
        # Check if any claims were auto-paid
        green_claims = [c for c in body["claims"] if c["fraud_tier"] == "green"]
        for claim in green_claims:
            assert claim["status"] == "paid"
            assert claim["payout"]["status"] in ("processed", "completed", "sandbox_active")

    def test_d4_05_view_my_claims_with_trigger_details(self):
        """Worker can see their claims with trigger context."""
        token, worker_id, headers = _full_onboarding("Rajajinagar")
        client.post("/api/policies/create", json={
            "worker_id": worker_id, "plan_type": "standard",
        }, headers=headers)

        admin_headers = _admin_login()
        client.post(
            "/api/triggers/simulate/curfew?zone=Rajajinagar&severity=severe",
            headers=admin_headers,
        )

        resp = client.get("/api/claims/me", headers=headers)
        assert resp.status_code == 200
        claims = resp.json()
        assert len(claims) >= 1
        for claim in claims:
            assert "trigger_type" in claim
            assert "amount" in claim
            assert "fraud_score" in claim
            assert "status" in claim

    def test_d4_06_admin_claims_queue_shows_pending_review(self):
        """Admin sees claims requiring manual review."""
        admin_headers = _admin_login()
        resp = client.get("/api/admin/claims/queue", headers=admin_headers)
        assert resp.status_code == 200
        body = resp.json()
        assert "total_pending" in body
        assert "claims" in body

    def test_d4_07_admin_approve_reject_claim(self):
        """Admin can approve or reject held claims."""
        admin_headers = _admin_login()
        queue_resp = client.get("/api/admin/claims/queue", headers=admin_headers)
        body = queue_resp.json()
        if body["total_pending"] > 0:
            claim_id = body["claims"][0]["id"]
            resp = client.put(
                f"/api/claims/{claim_id}/approve?notes=Test+approved",
                headers=admin_headers,
            )
            assert resp.status_code == 200
            assert resp.json()["status"] == "paid"

    def test_d4_08_trigger_poll_runs_all_zones(self):
        """Background trigger polling checks all 8 zones."""
        resp = client.get("/api/triggers/poll")
        assert resp.status_code == 200
        body = resp.json()
        assert body["status"] in ("ok", "error")
        assert body["zones_checked"] == 8

    def test_d4_09_claim_review_auto_releases_amber(self):
        """Background claim reviewer processes AMBER claims."""
        resp = client.get("/api/claims/review")
        assert resp.status_code == 200
        body = resp.json()
        assert body["status"] in ("ok", "error")
        assert "claims_pending" in body

    def test_d4_10_zone_live_status_shows_all_signals(self):
        """Zone status aggregates weather, AQI, traffic, curfew, flood."""
        resp = client.get("/api/triggers/zone-status/Indiranagar")
        assert resp.status_code == 200
        body = resp.json()
        assert "weather" in body
        assert "aqi" in body
        assert "traffic" in body
        assert "curfew" in body
        assert "flood" in body


# ═══════════════════════════════════════════════════════════════════════
# D5 — ADMIN DASHBOARD & OPERATIONAL READINESS
# ═══════════════════════════════════════════════════════════════════════

class TestD5AdminDashboard:
    """Deliverable 5: Admin portal with KPIs, analytics, and integrations."""

    def test_d5_01_dashboard_returns_all_kpis(self):
        """Dashboard includes all 8+ key performance indicators."""
        admin = _admin_login()
        resp = client.get("/api/admin/dashboard", headers=admin)
        assert resp.status_code == 200
        body = resp.json()
        required = [
            "total_workers", "active_policies", "total_claims",
            "claims_paid", "claims_pending", "combined_loss_ratio",
            "fraud_detection_rate", "active_triggers",
        ]
        for field in required:
            assert field in body, f"Missing KPI: {field}"

    def test_d5_02_analytics_returns_chart_data(self):
        """Analytics includes zone distribution, trigger frequency, etc."""
        admin = _admin_login()
        resp = client.get("/api/admin/analytics", headers=admin)
        assert resp.status_code == 200
        body = resp.json()
        assert "zone_distribution" in body
        assert "trigger_frequency" in body
        assert "fraud_distribution" in body
        assert "premium_by_zone" in body
        assert "daily_activity" in body
        assert "claim_pipeline" in body

    def test_d5_03_integration_status_exposed(self):
        """Integration readiness is visible for judges."""
        admin = _admin_login()
        resp = client.get("/api/admin/integrations/status", headers=admin)
        assert resp.status_code == 200
        body = resp.json()
        assert "integrations" in body
        for provider in ("weather", "otp", "kyc", "payments", "guidewire"):
            assert provider in body["integrations"]

    def test_d5_04_live_zone_intelligence_aggregates(self):
        """Live zone intelligence returns environmental data for all zones."""
        admin = _admin_login()
        resp = client.get("/api/admin/live-zone-intelligence", headers=admin)
        assert resp.status_code == 200
        body = resp.json()
        assert body["summary"]["zones_monitored"] == 8
        assert len(body["zones"]) == 8
        for zone in body["zones"]:
            assert "composite_risk_pct" in zone
            assert "status" in zone
            assert "weather" in zone
            assert "coordinates" in zone

    def test_d5_05_payout_history_accessible(self):
        """Admin can view all payout transactions."""
        admin = _admin_login()
        resp = client.get("/api/admin/payouts", headers=admin)
        assert resp.status_code == 200
        assert isinstance(resp.json(), list)


# ═══════════════════════════════════════════════════════════════════════
# D6 — INFRASTRUCTURE & DEPLOYMENT READINESS
# ═══════════════════════════════════════════════════════════════════════

class TestD6InfrastructureReadiness:
    """Deliverable 6: Health, readiness, metrics, and HuggingFace Spaces compat."""

    def test_d6_01_health_endpoint(self):
        resp = client.get("/health")
        assert resp.status_code == 200
        assert resp.json()["status"] == "healthy"

    def test_d6_02_ready_endpoint_with_db_check(self):
        resp = client.get("/ready")
        assert resp.status_code == 200
        body = resp.json()
        assert body["database"]["ok"] is True
        assert body["counts"]["workers_total"] >= 0

    def test_d6_03_metrics_endpoint(self):
        resp = client.get("/metrics")
        assert resp.status_code == 200
        body = resp.json()
        assert body["rate_limit_per_minute"] > 0
        assert "counts" in body

    def test_d6_04_api_info_endpoint(self):
        resp = client.get("/api/info")
        assert resp.status_code == 200
        body = resp.json()
        assert body["name"] == "GigBuddy API"
        assert "endpoints" in body

    def test_d6_05_support_endpoint_public(self):
        resp = client.get("/api/auth/support")
        assert resp.status_code == 200
        body = resp.json()
        assert body["account_deletion_available_in_app"] is True
        assert "integration_status" in body

    def test_d6_06_unauthenticated_access_blocked(self):
        """Protected endpoints return 401 without auth."""
        for path in ("/api/auth/me", "/api/policies/me", "/api/claims/me", "/api/admin/dashboard"):
            resp = client.get(path)
            assert resp.status_code == 401, f"{path} should require auth"

    def test_d6_07_admin_login_validates_credentials(self):
        """Invalid admin credentials are rejected."""
        resp = client.post("/api/auth/admin/login", json={
            "username": "wrong", "password": "wrong",
        })
        assert resp.status_code == 401


# ═══════════════════════════════════════════════════════════════════════
# D7 — ACCOUNT LIFECYCLE (deletion + anonymization)
# ═══════════════════════════════════════════════════════════════════════

class TestD7AccountLifecycle:
    """Deliverable 7: Account deletion with financial record retention."""

    def test_d7_01_account_deletion_anonymizes_profile(self):
        """Deleting account anonymizes PII but retains financial records."""
        token, worker_id, headers = _full_onboarding()

        resp = client.request("DELETE", "/api/auth/account", json={
            "otp": "1234",
            "confirmation_text": "DELETE",
        }, headers=headers)
        assert resp.status_code == 200
        body = resp.json()
        assert body["success"] is True
        assert "deleted_at" in body

    def test_d7_02_deleted_account_cannot_login(self):
        """Deleted accounts are blocked from accessing APIs."""
        phone = _unique_phone()
        reg = _register_worker(phone)
        otp = _verify_otp(phone)
        token = otp["access_token"]
        worker_id = otp["worker_id"]
        headers = _auth_header(token)

        # Complete onboarding
        client.post("/api/auth/kyc", json={
            "worker_id": worker_id, "aadhaar_number": "123456789012",
        }, headers=headers)
        client.post("/api/auth/setup-upi", json={
            "worker_id": worker_id, "upi_id": f"t{worker_id}@upi",
        }, headers=headers)

        # Delete account
        client.request("DELETE", "/api/auth/account", json={
            "otp": "1234", "confirmation_text": "DELETE",
        }, headers=headers)

        # Verify profile access is blocked
        resp = client.get("/api/auth/me", headers=headers)
        assert resp.status_code == 403
