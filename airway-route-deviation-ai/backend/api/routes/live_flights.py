print("✅ live_flights.py imported")
from fastapi import APIRouter
from backend.services.live_flight_service import get_live_flights

router = APIRouter(tags=["Live Flights"])


@router.get("/live-flights")
def live_flights():
    """
    Returns live aircraft data from OpenSky Network.
    """
    return get_live_flights()