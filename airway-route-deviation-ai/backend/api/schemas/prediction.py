from datetime import datetime
from typing import Any

from pydantic import BaseModel


class PredictionRequest(BaseModel):
    departure_airport: str
    destination_airport: str

    longitude: float
    latitude: float
    velocity: float
    true_track: float
    vertical_rate: float
    baro_altitude: float
    geo_altitude: float


class PredictionRecordResponse(BaseModel):
    id: int

    departure_airport: str
    destination_airport: str

    longitude: float
    latitude: float
    velocity: float
    true_track: float
    vertical_rate: float
    baro_altitude: float
    geo_altitude: float

    prediction: int
    confidence: float
    status: str

    review_status: str
    notes: str | None = None

    created_at: datetime

    model_config = {
        "from_attributes": True
    }


class PredictionResponse(BaseModel):
    prediction: int
    confidence: float
    status: str

    risk_level: str
    reason: str
    recommendation: str

    fuel_saving: int
    co2_reduction: int

    alternate_route: dict[str, Any] | None = None


class PredictionUpdateRequest(BaseModel):
    review_status: str
    notes: str | None = None