from pydantic import BaseModel


class PredictionRequest(BaseModel):
    longitude: float
    latitude: float
    velocity: float
    true_track: float
    vertical_rate: float
    baro_altitude: float
    geo_altitude: float

class PredictionResponse(BaseModel):
    prediction: int
    confidence: float
    status: str