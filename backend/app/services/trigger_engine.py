"""5-Trigger Parametric Engine.

Monitors zone conditions via external APIs and fires triggers when
dual-signal thresholds are met. Each trigger type has specific
primary + secondary signal requirements.
"""
from datetime import datetime
from app.services.external_apis import (
    get_imd_weather, get_cpcb_aqi, get_maps_traffic,
    get_curfew_alerts, get_flood_sensor,
)


# ── Trigger Thresholds ────────────────────────────────────────────────

TRIGGER_CONFIG = {
    "rainfall": {
        "name": "Heavy Rainfall",
        "emoji": "🌧️",
        "primary": {"source": "IMD", "metric": "rainfall_6hr_mm", "threshold": 50},
        "secondary": {"source": "Google Maps", "metric": "congestion_level", "threshold": 4},
        "logic": "AND",
        "payout_pct": 0.80,
        "description": "IMD ≥50mm in 6hrs AND Google Maps Level 4+ congestion",
    },
    "aqi": {
        "name": "Hazardous AQI",
        "emoji": "🌫️",
        "primary": {"source": "CPCB", "metric": "aqi", "threshold": 300},
        "secondary": {"source": "IMD", "metric": "wind_speed_kmh", "threshold": 5, "direction": "below"},
        "logic": "AND",
        "payout_pct": 0.70,
        "description": "CPCB AQI ≥300 AND IMD Wind <5 km/h (no dispersal)",
    },
    "heat": {
        "name": "Extreme Heat",
        "emoji": "🔥",
        "primary": {"source": "IMD", "metric": "temperature_c", "threshold": 40},
        "secondary": {"source": "CPCB", "metric": "heat_index", "threshold": "Extreme Caution"},
        "logic": "AND",
        "payout_pct": 0.60,
        "description": "IMD ≥40°C for 2 consecutive days AND CPCB Heat Index Extreme",
    },
    "curfew": {
        "name": "Curfew / Strike",
        "emoji": "🚧",
        "primary": {"source": "News API", "metric": "alert_active", "threshold": True},
        "secondary": {"source": "District Admin", "metric": "gazette_confirmed", "threshold": True},
        "logic": "OR",
        "payout_pct": 1.00,
        "description": "District Admin gazette alert OR verified news reports of civic disruption",
    },
    "flooding": {
        "name": "Urban Flooding",
        "emoji": "🌊",
        "primary": {"source": "BBMP Flood Sensor", "metric": "water_level_m", "threshold": 0.5},
        "secondary": {"source": "Google Maps", "metric": "congestion_level", "threshold": 4},
        "logic": "AND",
        "payout_pct": 0.90,
        "description": "Waterlogging ≥0.5m AND road impassable (Maps Level 4+)",
    },
}


def check_trigger(zone: str, trigger_type: str) -> dict:
    """Check if a specific trigger condition is met for a zone.

    Returns trigger data if fired, None if conditions not met.
    """
    config = TRIGGER_CONFIG.get(trigger_type)
    if not config:
        return {"fired": False, "error": f"Unknown trigger type: {trigger_type}"}

    # Fetch data from mock APIs based on trigger type
    weather = get_imd_weather(zone, trigger_mode=trigger_type)
    aqi = get_cpcb_aqi(zone, trigger_mode=trigger_type)
    traffic = get_maps_traffic(zone, trigger_mode=trigger_type)
    curfew = get_curfew_alerts(zone, trigger_mode=trigger_type)
    flood = get_flood_sensor(zone, trigger_mode=trigger_type)

    # Evaluate primary signal
    primary_met, primary_value = _evaluate_signal(
        config["primary"], weather, aqi, traffic, curfew, flood
    )

    # Evaluate secondary signal
    secondary_met, secondary_value = _evaluate_signal(
        config["secondary"], weather, aqi, traffic, curfew, flood
    )

    # Apply logic gate
    if config["logic"] == "AND":
        fired = primary_met and secondary_met
    else:  # OR
        fired = primary_met or secondary_met

    # Determine severity
    if fired:
        if primary_value and isinstance(primary_value, (int, float)):
            threshold = config["primary"]["threshold"]
            if isinstance(threshold, (int, float)):
                ratio = primary_value / threshold
                severity = "extreme" if ratio > 1.5 else "severe" if ratio > 1.0 else "moderate"
            else:
                severity = "severe"
        else:
            severity = "severe"
    else:
        severity = "none"

    return {
        "fired": fired,
        "trigger_type": trigger_type,
        "config": config,
        "zone": zone,
        "severity": severity,
        "primary_signal": config["primary"]["source"],
        "primary_value": primary_value,
        "primary_met": primary_met,
        "secondary_signal": config["secondary"]["source"],
        "secondary_value": secondary_value,
        "secondary_met": secondary_met,
        "logic": config["logic"],
        "payout_percentage": config["payout_pct"] if fired else 0,
        "description": config["description"],
        "raw_data": {
            "weather": weather,
            "aqi": aqi,
            "traffic": traffic,
            "curfew": curfew,
            "flood": flood,
        },
        "checked_at": datetime.utcnow().isoformat(),
    }


def check_all_triggers(zone: str) -> list[dict]:
    """Check all 5 triggers for a zone. Returns list of fired triggers."""
    results = []
    for trigger_type in TRIGGER_CONFIG:
        result = check_trigger(zone, trigger_type)
        results.append(result)
    return results


def simulate_trigger(zone: str, trigger_type: str, severity: str = "severe") -> dict:
    """Force a trigger to fire for demo purposes."""
    return check_trigger(zone, trigger_type)


def get_trigger_config() -> dict:
    """Return trigger configuration for display."""
    return TRIGGER_CONFIG


def _evaluate_signal(signal_config, weather, aqi, traffic, curfew, flood):
    """Evaluate a single signal against its threshold."""
    source = signal_config["source"]
    metric = signal_config["metric"]
    threshold = signal_config["threshold"]
    direction = signal_config.get("direction", "above")  # above or below

    # Map source to data
    data_map = {
        "IMD": weather,
        "CPCB": aqi,
        "Google Maps": traffic,
        "News API": curfew,
        "District Admin": curfew,
        "BBMP Flood Sensor": flood,
    }

    data = data_map.get(source, {})
    value = data.get(metric)

    if value is None:
        return False, None

    # Evaluate threshold
    if isinstance(threshold, bool):
        met = value == threshold
    elif isinstance(threshold, str):
        met = str(value) == threshold
    elif direction == "below":
        met = value < threshold
    else:
        met = value >= threshold

    return met, value
