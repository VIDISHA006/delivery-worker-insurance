"""Isolation Forest Fraud Detection Engine.

Trains a REAL Isolation Forest model on synthetic claim data at module load.
Applies hard rules (Phase 1 §4.2) + ML anomaly scoring for three-tier
classification: GREEN / AMBER / RED (Phase 1 §9.4).
"""
import numpy as np
import warnings
from datetime import datetime, timedelta
from sklearn.ensemble import IsolationForest

warnings.filterwarnings("ignore", category=UserWarning)

# ── Train Real Isolation Forest Model ─────────────────────────────────
_iso_forest = None
_feature_names = [
    "gps_distance_km", "claim_trigger_delay_hrs", "recent_claims_30d",
    "signal_strength", "accel_variance", "peer_zone_density",
]


def _generate_training_data(n_samples=1000):
    """Generate synthetic claim data for Isolation Forest training.

    95% legitimate claims + 5% fraudulent patterns.
    """
    np.random.seed(42)
    X = []

    # Legitimate claims (950 samples)
    n_legit = int(n_samples * 0.95)
    for _ in range(n_legit):
        X.append([
            np.random.exponential(0.5),       # gps_distance: 0-2km (legit = close)
            np.random.exponential(0.3),       # delay: 0-1hr (legit = fast claim)
            np.random.randint(0, 3),           # recent_claims: 0-2 (normal)
            np.random.uniform(0.2, 0.8),       # signal: moderate (storm)
            np.random.uniform(0.5, 2.0),       # accel: riding motion
            np.random.uniform(0.3, 0.8),       # peer: moderate density
        ])

    # Fraudulent claims (50 samples)
    n_fraud = n_samples - n_legit
    for _ in range(n_fraud):
        X.append([
            np.random.uniform(8.0, 25.0),      # gps_distance: far away
            np.random.uniform(3.0, 8.0),       # delay: very late
            np.random.randint(4, 8),            # recent_claims: suspiciously many
            np.random.uniform(0.85, 1.0),       # signal: suspiciously strong (indoors)
            np.random.uniform(0.0, 0.1),        # accel: stationary (not riding)
            np.random.uniform(0.9, 1.0),        # peer: suspiciously high
        ])

    return np.array(X)


def _train_model():
    """Train Isolation Forest on synthetic claim data."""
    global _iso_forest
    X = _generate_training_data(1000)
    _iso_forest = IsolationForest(
        n_estimators=100,
        contamination=0.05,
        random_state=42,
        n_jobs=-1,
    )
    _iso_forest.fit(X)
    print("✅ Isolation Forest Fraud Model trained on 1000 claim samples")


# Train at import time
_train_model()


# ── Hard Rules (Phase 1 §4.2) ────────────────────────────────────────

def _apply_hard_rules(
    claim_zone: str,
    gps_zone: str,
    claim_time: datetime,
    trigger_time: datetime,
    recent_claims_count: int,
) -> dict:
    """Apply deterministic pre-filter rules before ML scoring.

    Rules from Phase 1 §4.2:
    (a) Claim zone ≠ GPS zone → flag
    (b) >3 claims from same device in 30 days → flag
    (c) Claim >6hrs after trigger window → reject
    """
    flags = []
    checks_passed = []
    hard_score = 0.0

    # Rule (a): Zone mismatch
    if claim_zone != gps_zone:
        flags.append({
            "rule": "zone_mismatch",
            "detail": f"Claim zone '{claim_zone}' ≠ GPS zone '{gps_zone}'",
            "severity": "high",
        })
        hard_score += 0.35
    else:
        checks_passed.append("zone_match_verified")

    # Rule (b): Claim velocity
    if recent_claims_count > 3:
        flags.append({
            "rule": "high_claim_frequency",
            "detail": f"{recent_claims_count} claims in 30 days (threshold: 3)",
            "severity": "medium",
        })
        hard_score += 0.20
    else:
        checks_passed.append(f"claim_frequency_ok ({recent_claims_count}/30d)")

    # Rule (c): Timing check
    if claim_time and trigger_time:
        delay_hrs = (claim_time - trigger_time).total_seconds() / 3600
        if delay_hrs > 6:
            flags.append({
                "rule": "late_claim",
                "detail": f"Claim {delay_hrs:.1f}hrs after trigger (max: 6hrs)",
                "severity": "high",
            })
            hard_score += 0.30
        elif delay_hrs > 3:
            flags.append({
                "rule": "delayed_claim",
                "detail": f"Claim {delay_hrs:.1f}hrs after trigger (elevated risk)",
                "severity": "low",
            })
            hard_score += 0.10
        else:
            checks_passed.append(f"timing_ok ({delay_hrs:.1f}hrs)")
    else:
        checks_passed.append("timing_check_skipped")

    return {
        "hard_score": min(1.0, hard_score),
        "flags": flags,
        "checks_passed": checks_passed,
    }


# ── ML Anomaly Scoring ───────────────────────────────────────────────

def _ml_anomaly_score(
    gps_distance_km: float,
    claim_trigger_delay_hrs: float,
    recent_claims_30d: int,
    signal_strength: float = 0.5,
    accel_variance: float = 1.0,
    peer_zone_density: float = 0.5,
) -> float:
    """Run Isolation Forest to get anomaly score.

    Returns score 0.0 (normal) to 1.0 (highly anomalous).
    """
    if _iso_forest is None:
        return 0.0

    features = np.array([[
        gps_distance_km,
        claim_trigger_delay_hrs,
        recent_claims_30d,
        signal_strength,
        accel_variance,
        peer_zone_density,
    ]])

    # Isolation Forest: decision_function returns negative for anomalies
    raw_score = _iso_forest.decision_function(features)[0]
    # Map to 0-1: more negative = more anomalous
    anomaly_score = max(0.0, min(1.0, 0.5 - raw_score))
    return round(anomaly_score, 4)


# ── Combined Fraud Score ─────────────────────────────────────────────

def generate_fraud_score(
    claim_zone: str,
    gps_zone: str,
    claim_time: datetime = None,
    trigger_time: datetime = None,
    worker_id: int = None,
    recent_claims_count: int = 0,
    gps_available: bool = True,
    gps_distance_km: float = None,
    signal_strength: float = None,
    accel_variance: float = None,
) -> dict:
    """Combined fraud detection: hard rules + Isolation Forest ML.

    Returns:
        dict with fraud_score, fraud_tier, detailed breakdown.
    """
    if claim_time is None:
        claim_time = datetime.utcnow()
    if trigger_time is None:
        trigger_time = datetime.utcnow() - timedelta(minutes=15)

    # Simulate sensor data if not provided (demo mode)
    if gps_distance_km is None:
        # Legitimate: 0-2km; simulate based on zone match
        if claim_zone == gps_zone:
            gps_distance_km = round(np.random.exponential(0.5), 2)
        else:
            gps_distance_km = round(np.random.uniform(5, 20), 2)

    if signal_strength is None:
        signal_strength = round(np.random.uniform(0.3, 0.7), 2)

    if accel_variance is None:
        accel_variance = round(np.random.uniform(0.5, 1.5), 2)

    delay_hrs = (claim_time - trigger_time).total_seconds() / 3600

    # Step 1: Hard rules
    hard_result = _apply_hard_rules(
        claim_zone, gps_zone, claim_time, trigger_time, recent_claims_count
    )

    # Step 2: ML anomaly score
    ml_score = _ml_anomaly_score(
        gps_distance_km=gps_distance_km,
        claim_trigger_delay_hrs=max(0, delay_hrs),
        recent_claims_30d=recent_claims_count,
        signal_strength=signal_strength,
        accel_variance=accel_variance,
        peer_zone_density=min(1.0, recent_claims_count / 5.0),
    )

    # Step 3: Combined score (60% ML + 40% hard rules)
    combined_score = round(0.60 * ml_score + 0.40 * hard_result["hard_score"], 4)

    # Step 4: Three-tier classification (Phase 1 §9.4)
    if combined_score < 0.45:
        fraud_tier = "green"
    elif combined_score < 0.70:
        fraud_tier = "amber"
    else:
        fraud_tier = "red"

    return {
        "fraud_score": combined_score,
        "fraud_tier": fraud_tier,
        "ml_anomaly_score": ml_score,
        "hard_rules_score": hard_result["hard_score"],
        "model": "Isolation Forest (trained on 1000 claim samples)",
        "scoring_weights": {"ml": 0.60, "hard_rules": 0.40},
        "checks_passed": hard_result["checks_passed"],
        "flags": hard_result["flags"],
        "sensor_data": {
            "gps_distance_km": gps_distance_km,
            "signal_strength": signal_strength,
            "accel_variance": accel_variance,
            "claim_delay_hrs": round(max(0, delay_hrs), 2),
        },
        "tier_thresholds": {
            "green": "0.00 – 0.45 (instant payout)",
            "amber": "0.45 – 0.70 (24hr hold + liveness check)",
            "red": "0.70+ (quarantined, human review)",
        },
    }
