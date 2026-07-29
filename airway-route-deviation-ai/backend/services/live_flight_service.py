import requests

OPENSKY_URL = "https://opensky-network.org/api/states/all"


def get_live_flights():
    try:
        response = requests.get(OPENSKY_URL, timeout=10)
        response.raise_for_status()

        data = response.json()
        flights = []

        for state in data.get("states", []):
            # Skip records without coordinates
            if state[5] is None or state[6] is None:
                continue

            flights.append({
                "icao24": state[0],
                "callsign": state[1].strip() if state[1] else "Unknown",
                "country": state[2],
                "longitude": state[5],
                "latitude": state[6],
                "baro_altitude": state[7],
                "velocity": state[9],
                "true_track": state[10],
                "vertical_rate": state[11],
                "geo_altitude": state[13],
                "on_ground": state[8],
            })

        return flights

    except Exception as e:
        return {
            "error": str(e)
        }