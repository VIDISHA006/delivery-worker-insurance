"""External API Integration Layer.

Uses OpenWeatherMap for REAL weather data. Falls back to zone-calibrated
realistic simulation when API key is unavailable. CPCB, Traffic, Flood
sensors use zone-aware realistic data calibrated to Bengaluru conditions.

Set OPENWEATHER_API_KEY environment variable to enable real weather data.
"""
from __future__ import annotations

import os
import math
import random
import hashlib
import httpx
from datetime import datetime
from typing import Optional

from app.config import settings

# ── OpenWeatherMap Configuration ─────────────────────────────────────
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY", "")
OPENWEATHER_BASE = "https://api.openweathermap.org/data/2.5"

# Zone coordinates for API calls
ZONE_COORDS = {
    "Indiranagar":     {"lat": 12.9784, "lng": 77.6408},
    "Koramangala":     {"lat": 12.9352, "lng": 77.6245},
    "Whitefield":      {"lat": 12.9698, "lng": 77.7499},
    "Rajajinagar":     {"lat": 12.9896, "lng": 77.5524},
    "HSR Layout":      {"lat": 12.9116, "lng": 77.6389},
    "Jayanagar":       {"lat": 12.9250, "lng": 77.5938},
    "Marathahalli":    {"lat": 12.9591, "lng": 77.6974},
    "Electronic City": {"lat": 12.8399, "lng": 77.6770},
}

# Zone risk profiles for realistic simulation
ZONE_RISK = {
    "Indiranagar":     {"flood": 0.85, "aqi_base": 95,  "traffic_base": 3, "drain": 0.3},
    "Koramangala":     {"flood": 0.65, "aqi_base": 80,  "traffic_base": 3, "drain": 0.5},
    "Whitefield":      {"flood": 0.30, "aqi_base": 55,  "traffic_base": 2, "drain": 0.8},
    "Rajajinagar":     {"flood": 0.50, "aqi_base": 75,  "traffic_base": 2, "drain": 0.6},
    "HSR Layout":      {"flood": 0.55, "aqi_base": 70,  "traffic_base": 2, "drain": 0.45},
    "Jayanagar":       {"flood": 0.40, "aqi_base": 65,  "traffic_base": 2, "drain": 0.7},
    "Marathahalli":    {"flood": 0.72, "aqi_base": 88,  "traffic_base": 3, "drain": 0.35},
    "Electronic City": {"flood": 0.35, "aqi_base": 60,  "traffic_base": 1, "drain": 0.75},
}


def _zone_seed(zone: str, salt: str = "") -> random.Random:
    """Create deterministic-per-zone random to ensure consistent data within API call."""
    h = hashlib.md5(f"{zone}{salt}{datetime.utcnow().strftime('%Y-%m-%d-%H')}".encode())
    return random.Random(int(h.hexdigest(), 16))


# ══════════════════════════════════════════════════════════════════════
# 1. WEATHER (IMD / OpenWeatherMap)
# ══════════════════════════════════════════════════════════════════════

def _fetch_real_weather(zone: str) -> Optional[dict]:
    """Fetch real weather data using Open-Meteo public APIs."""
    coords = ZONE_COORDS.get(zone)
    if not coords:
        return None
    try:
        with httpx.Client(timeout=8.0) as client:
            resp = client.get(
                "https://api.open-meteo.com/v1/forecast",
                params={
                    "latitude": coords["lat"],
                    "longitude": coords["lng"],
                    "current": "temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m",
                    "hourly": "precipitation",
                    "forecast_days": 1,
                    "timezone": "Asia/Kolkata",
                },
            )
            if resp.status_code == 200:
                data = resp.json()
                hourly = data.get("hourly", {})
                rainfall_points = hourly.get("precipitation", [])[:6]
                current = data.get("current", {})
                rainfall_6hr = round(sum(rainfall_points), 1)
                return {
                    "source": "Open-Meteo Public API",
                    "zone": zone,
                    "timestamp": datetime.utcnow().isoformat(),
                    "rainfall_6hr_mm": rainfall_6hr,
                    "temperature_c": round(current.get("temperature_2m", 0), 1),
                    "humidity_pct": current.get("relative_humidity_2m", 0),
                    "wind_speed_kmh": round(current.get("wind_speed_10m", 0), 1),
                    "wind_direction": _deg_to_cardinal(current.get("wind_direction_10m", 0)),
                    "alert_level": _calc_weather_alert(rainfall_6hr, current.get("temperature_2m", 0)),
                    "forecast_next_6hr": "Live public weather feed",
                    "coordinates": coords,
                    "api": "open_meteo_live",
                }
    except Exception as e:
        print(f"Open-Meteo weather API error: {e}")
    return None


def _fetch_real_aqi(zone: str) -> Optional[dict]:
    """Fetch real AQI-style data using Open-Meteo air quality APIs."""
    coords = ZONE_COORDS.get(zone)
    if not coords:
        return None
    try:
        with httpx.Client(timeout=8.0) as client:
            resp = client.get(
                "https://air-quality-api.open-meteo.com/v1/air-quality",
                params={
                    "latitude": coords["lat"],
                    "longitude": coords["lng"],
                    "current": "european_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone",
                    "timezone": "Asia/Kolkata",
                },
            )
            resp.raise_for_status()
            current = resp.json().get("current", {})
            aqi = int(current.get("european_aqi", 0))
            if aqi >= 100:
                category = "Poor"
            elif aqi >= 50:
                category = "Moderate"
            else:
                category = "Good"
            return {
                "source": "Open-Meteo Air Quality API",
                "station": f"{zone} regional air quality feed",
                "zone": zone,
                "timestamp": datetime.utcnow().isoformat(),
                "aqi": aqi,
                "category": category,
                "pm25": round(current.get("pm2_5", 0), 1),
                "pm10": round(current.get("pm10", 0), 1),
                "wind_speed_kmh": 8.0,
                "health_advisory": "Avoid prolonged outdoor work" if aqi >= 100 else "Normal operations",
                "heat_index": "Normal",
                "api": "open_meteo_air_live",
            }
    except Exception as e:
        print(f"Open-Meteo AQI API error: {e}")
    return None


def _deg_to_cardinal(deg):
    dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    return dirs[round(deg / 45) % 8]


def _calc_weather_alert(rainfall_mm, temp_c):
    if rainfall_mm >= 50:
        return "RED"
    elif rainfall_mm >= 20:
        return "ORANGE"
    elif rainfall_mm >= 10 or temp_c >= 40:
        return "YELLOW"
    return "GREEN"


def get_imd_weather(zone: str, trigger_mode: str = None) -> dict:
    """Get weather data. Uses OpenWeatherMap if available, else realistic sim.

    When trigger_mode matches a weather-related trigger, returns elevated values
    that would cause the trigger to fire (for simulation purposes).
    """
    # If trigger_mode is rainfall/flooding, simulate trigger conditions
    if trigger_mode in ("rainfall", "flooding"):
        rng = _zone_seed(zone, f"trigger_{trigger_mode}")
        return {
            "source": "IMD Bengaluru Observatory",
            "zone": zone,
            "timestamp": datetime.utcnow().isoformat(),
            "rainfall_6hr_mm": round(rng.uniform(55, 95), 1),
            "temperature_c": round(rng.uniform(22, 26), 1),
            "humidity_pct": round(rng.uniform(90, 98), 1),
            "wind_speed_kmh": round(rng.uniform(25, 40), 1),
            "wind_direction": rng.choice(["W", "SW", "NW"]),
            "alert_level": "RED",
            "forecast_next_6hr": "Heavy to very heavy rainfall expected",
            "coordinates": ZONE_COORDS.get(zone, {"lat": 12.97, "lng": 77.59}),
            "api": "imd_triggered",
        }

    if trigger_mode == "heat":
        rng = _zone_seed(zone, "trigger_heat")
        return {
            "source": "IMD Bengaluru Observatory",
            "zone": zone,
            "timestamp": datetime.utcnow().isoformat(),
            "rainfall_6hr_mm": 0,
            "temperature_c": round(rng.uniform(40, 45), 1),
            "humidity_pct": round(rng.uniform(20, 35), 1),
            "wind_speed_kmh": round(rng.uniform(2, 6), 1),
            "wind_direction": "E",
            "alert_level": "RED",
            "forecast_next_6hr": "Extreme heat conditions persist",
            "coordinates": ZONE_COORDS.get(zone, {"lat": 12.97, "lng": 77.59}),
            "api": "imd_triggered",
        }

    if trigger_mode == "aqi":
        rng = _zone_seed(zone, "trigger_aqi")
        return {
            "source": "IMD Bengaluru Observatory",
            "zone": zone,
            "timestamp": datetime.utcnow().isoformat(),
            "rainfall_6hr_mm": 0,
            "temperature_c": round(rng.uniform(28, 35), 1),
            "humidity_pct": round(rng.uniform(30, 50), 1),
            "wind_speed_kmh": round(rng.uniform(1, 4), 1),  # Low wind for AQI trigger
            "wind_direction": "NE",
            "alert_level": "YELLOW",
            "forecast_next_6hr": "Calm winds, poor air dispersion expected",
            "coordinates": ZONE_COORDS.get(zone, {"lat": 12.97, "lng": 77.59}),
            "api": "imd_triggered",
        }

    # Normal mode: zone-calibrated realistic data
    live_weather = _fetch_real_weather(zone)
    if live_weather:
        return live_weather

    rng = _zone_seed(zone, "weather")
    risk = ZONE_RISK.get(zone, ZONE_RISK["Koramangala"])
    month = datetime.utcnow().month
    monsoon_mult = 1.5 if month in (6, 7, 8, 9) else 0.5 if month in (1, 2, 3) else 1.0

    rainfall = round(rng.uniform(0, 15) * monsoon_mult * (1 + risk["flood"] * 0.3), 1)
    temp = round(rng.uniform(25, 35) + (3 if month in (3, 4, 5) else -2 if month in (12, 1) else 0), 1)

    return {
        "source": "IMD Bengaluru Observatory",
        "zone": zone,
        "timestamp": datetime.utcnow().isoformat(),
        "rainfall_6hr_mm": rainfall,
        "temperature_c": temp,
        "humidity_pct": round(rng.uniform(35, 75) * monsoon_mult, 1),
        "wind_speed_kmh": round(rng.uniform(3, 15), 1),
        "wind_direction": rng.choice(["N", "NE", "E", "SE", "S", "SW", "W", "NW"]),
        "alert_level": _calc_weather_alert(rainfall, temp),
        "forecast_next_6hr": "Partly cloudy, light showers possible" if rainfall > 5 else "Clear skies expected",
        "coordinates": ZONE_COORDS.get(zone, {"lat": 12.97, "lng": 77.59}),
        "api": "imd_simulated",
    }


# ══════════════════════════════════════════════════════════════════════
# 2. AIR QUALITY (CPCB)
# ══════════════════════════════════════════════════════════════════════

def get_cpcb_aqi(zone: str, trigger_mode: str = None) -> dict:
    """Get AQI data from CPCB-calibrated simulation.

    Bengaluru AQI typically ranges 40-150. During trigger mode, spikes above 300.
    """
    live_aqi = _fetch_real_aqi(zone)
    if live_aqi and trigger_mode is None:
        return live_aqi

    rng = _zone_seed(zone, "aqi")
    risk = ZONE_RISK.get(zone, ZONE_RISK["Koramangala"])

    if trigger_mode == "aqi":
        aqi = rng.randint(310, 420)
        category = "Severe" if aqi >= 400 else "Very Poor"
        wind = round(rng.uniform(1, 4), 1)
        return {
            "source": "CPCB India AQI Network",
            "station": f"{zone} Monitoring Station",
            "zone": zone,
            "timestamp": datetime.utcnow().isoformat(),
            "aqi": aqi,
            "category": category,
            "pm25": round(aqi * 0.85 + rng.uniform(-10, 10), 1),
            "pm10": round(aqi * 1.1 + rng.uniform(-15, 15), 1),
            "wind_speed_kmh": wind,
            "health_advisory": "Avoid outdoor exposure",
            "heat_index": "Extreme Caution",
            "api": "cpcb_triggered",
        }

    base_aqi = risk["aqi_base"]
    month = datetime.utcnow().month
    seasonal_aqi = base_aqi * (1.3 if month in (11, 12, 1) else 0.9 if month in (7, 8) else 1.0)
    aqi = int(seasonal_aqi + rng.uniform(-15, 20))
    aqi = max(30, min(200, aqi))

    if aqi >= 200:
        cat = "Poor"
    elif aqi >= 100:
        cat = "Moderate"
    elif aqi >= 50:
        cat = "Satisfactory"
    else:
        cat = "Good"

    return {
        "source": "CPCB India AQI Network",
        "station": f"{zone} Monitoring Station",
        "zone": zone,
        "timestamp": datetime.utcnow().isoformat(),
        "aqi": aqi,
        "category": cat,
        "pm25": round(aqi * 0.85 + rng.uniform(-5, 5), 1),
        "pm10": round(aqi * 1.1 + rng.uniform(-8, 8), 1),
        "wind_speed_kmh": round(rng.uniform(5, 20), 1),
        "health_advisory": "Restrict outdoor activities" if aqi >= 150 else "No restrictions",
        "heat_index": "Normal",
        "api": "cpcb_simulated",
    }


# ══════════════════════════════════════════════════════════════════════
# 3. TRAFFIC (Google Maps Platform)
# ══════════════════════════════════════════════════════════════════════

def get_maps_traffic(zone: str, trigger_mode: str = None) -> dict:
    """Get traffic congestion data from zone-aware simulation.

    Uses time-of-day patterns: morning rush (8-10), evening rush (5-8),
    and zone-specific base congestion levels.
    """
    rng = _zone_seed(zone, "traffic")
    risk = ZONE_RISK.get(zone, ZONE_RISK["Koramangala"])

    if trigger_mode in ("rainfall", "flooding"):
        level = rng.randint(4, 5)
        return {
            "source": "Google Maps Platform Traffic Layer",
            "zone": zone,
            "timestamp": datetime.utcnow().isoformat(),
            "congestion_level": level,
            "congestion_label": "Severe" if level == 5 else "Very Congested",
            "avg_speed_kmh": round(rng.uniform(3, 8), 1),
            "road_closures": rng.randint(3, 8),
            "alternate_routes_available": False,
            "estimated_delay_minutes": rng.randint(45, 90),
            "api": "maps_triggered",
        }

    hour = datetime.utcnow().hour
    rush_add = 1 if hour in (8, 9, 10, 17, 18, 19) else 0
    base = risk["traffic_base"]
    level = min(5, max(1, base + rush_add + rng.randint(-1, 1)))

    labels = {1: "Light", 2: "Moderate", 3: "Congested", 4: "Very Congested", 5: "Severe"}
    speeds = {1: 35, 2: 22, 3: 15, 4: 8, 5: 4}

    return {
        "source": "Google Maps Platform Traffic Layer",
        "zone": zone,
        "timestamp": datetime.utcnow().isoformat(),
        "congestion_level": level,
        "congestion_label": labels.get(level, "Moderate"),
        "avg_speed_kmh": round(speeds.get(level, 20) + rng.uniform(-3, 3), 1),
        "road_closures": 0 if level < 4 else rng.randint(1, 3),
        "alternate_routes_available": level < 4,
        "estimated_delay_minutes": max(0, (level - 2) * 15 + rng.randint(-5, 10)),
        "api": "maps_simulated",
    }


# ══════════════════════════════════════════════════════════════════════
# 4. CURFEW / CIVIC DISRUPTION (News API + District Admin)
# ══════════════════════════════════════════════════════════════════════

def get_curfew_alerts(zone: str, trigger_mode: str = None) -> dict:
    """Get civic disruption alerts from simulated news/admin feeds."""
    if trigger_mode == "curfew":
        return {
            "source": "District Admin Alert Feed + News API",
            "zone": zone,
            "timestamp": datetime.utcnow().isoformat(),
            "alert_active": True,
            "gazette_confirmed": True,
            "type": "Bandh / General Strike",
            "issued_by": "District Magistrate, Bengaluru Urban",
            "effective_from": datetime.utcnow().isoformat(),
            "expected_duration_hours": 12,
            "road_access": "Severely Restricted",
            "public_transport": "Suspended",
            "news_sources_reporting": 5,
            "api": "curfew_triggered",
        }

    return {
        "source": "District Admin Alert Feed + News API",
        "zone": zone,
        "timestamp": datetime.utcnow().isoformat(),
        "alert_active": False,
        "gazette_confirmed": False,
        "type": None,
        "road_access": "Normal",
        "public_transport": "Operational",
        "news_sources_reporting": 0,
        "api": "curfew_normal",
    }


# ══════════════════════════════════════════════════════════════════════
# 5. FLOOD SENSOR (BBMP)
# ══════════════════════════════════════════════════════════════════════

def get_flood_sensor(zone: str, trigger_mode: str = None) -> dict:
    """Get flood sensor data from BBMP ward-level simulation.

    Water levels correlated with zone drainage quality and rainfall.
    """
    rng = _zone_seed(zone, "flood")
    risk = ZONE_RISK.get(zone, ZONE_RISK["Koramangala"])
    sensor_id = f"BBMP-{zone[:3].upper()}-{hash(zone) % 900 + 100}"

    if trigger_mode == "flooding":
        water = round(rng.uniform(0.5, 1.2), 2)
        return {
            "source": "BBMP Urban Flood Sensor Network",
            "zone": zone,
            "sensor_id": sensor_id,
            "timestamp": datetime.utcnow().isoformat(),
            "water_level_m": water,
            "road_passable": False,
            "drain_capacity_pct": rng.randint(85, 100),
            "alert_level": "RED" if water >= 0.8 else "ORANGE",
            "pump_stations_active": rng.randint(2, 5),
            "api": "flood_triggered",
        }

    if trigger_mode == "rainfall":
        water = round(rng.uniform(0.2, 0.5) * (1 - risk["drain"] + 0.3), 2)
        return {
            "source": "BBMP Urban Flood Sensor Network",
            "zone": zone,
            "sensor_id": sensor_id,
            "timestamp": datetime.utcnow().isoformat(),
            "water_level_m": max(0.05, water),
            "road_passable": water < 0.5,
            "drain_capacity_pct": rng.randint(50, 80),
            "alert_level": "ORANGE" if water >= 0.3 else "YELLOW",
            "pump_stations_active": 1 if water >= 0.3 else 0,
            "api": "flood_rainfall_correlated",
        }

    # Normal: water level inversely proportional to drain quality
    base_water = (1 - risk["drain"]) * 0.15
    water = round(max(0, base_water + rng.uniform(-0.05, 0.08)), 2)

    if water >= 0.5:
        alert = "RED"
    elif water >= 0.2:
        alert = "YELLOW"
    else:
        alert = "NORMAL"

    return {
        "source": "BBMP Urban Flood Sensor Network",
        "zone": zone,
        "sensor_id": sensor_id,
        "timestamp": datetime.utcnow().isoformat(),
        "water_level_m": water,
        "road_passable": water < 0.5,
        "drain_capacity_pct": int((1 - water * 2) * 100),
        "alert_level": alert,
        "pump_stations_active": 0,
        "api": "flood_simulated",
    }


# ══════════════════════════════════════════════════════════════════════
# 6. AGGREGATED ZONE STATUS
# ══════════════════════════════════════════════════════════════════════

def get_zone_status(zone: str) -> dict:
    """Get aggregated live status of all environmental signals for a zone."""
    return {
        "zone": zone,
        "weather": get_imd_weather(zone),
        "aqi": get_cpcb_aqi(zone),
        "traffic": get_maps_traffic(zone),
        "curfew": get_curfew_alerts(zone),
        "flood": get_flood_sensor(zone),
    }
