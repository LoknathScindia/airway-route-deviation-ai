from fastapi import APIRouter

from backend.api.schemas import PredictionRequest, PredictionResponse
from backend.services.prediction_service import (
    predict_flight,
    get_prediction_history,
)

router = APIRouter()


@router.post("/predict", response_model=PredictionResponse)
def predict_route(request: PredictionRequest):
    result = predict_flight(request.model_dump())

    return PredictionResponse(
    prediction=result["prediction"],
    confidence=result["confidence"],
    status=result["status"],
)
@router.get("/predictions")
def get_predictions():
    predictions = get_prediction_history()

    return [
        {
            "id": prediction.id,
            "longitude": prediction.longitude,
            "latitude": prediction.latitude,
            "velocity": prediction.velocity,
            "true_track": prediction.true_track,
            "vertical_rate": prediction.vertical_rate,
            "baro_altitude": prediction.baro_altitude,
            "geo_altitude": prediction.geo_altitude,
            "prediction": prediction.prediction,
            "confidence": prediction.confidence,
            "status": prediction.status,
            "created_at": prediction.created_at,
        }
        for prediction in predictions
    ]