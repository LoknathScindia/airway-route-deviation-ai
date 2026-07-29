from fastapi import APIRouter

from backend.api.schemas import PredictionResponse
from backend.ml.inference.predictor import predict

router = APIRouter(tags=["Live Prediction"])


@router.post("/predict/live", response_model=PredictionResponse)
def predict_live_route(features: dict):
    """
    Predict route deviation for live aircraft data from OpenSky.
    No departure or destination airport is required.
    """

    result = predict(features)

    prediction = int(result["prediction"])
    confidence = float(result["confidence"])

    if prediction == 1:
        status = "Route Deviation"
        risk_level = "High"
        reason = (
            "Flight characteristics indicate a possible deviation from the planned route."
        )
        recommendation = (
            "Monitor the aircraft and consider evaluating alternate routing."
        )
        fuel_saving = 8
        co2_reduction = 5

    else:
        status = "Normal Flight"
        risk_level = "Low"
        reason = (
            "Current flight parameters appear normal."
        )
        recommendation = (
            "Continue monitoring."
        )
        fuel_saving = 0
        co2_reduction = 0

    return PredictionResponse(
        prediction=prediction,
        confidence=confidence,
        status=status,
        risk_level=risk_level,
        reason=reason,
        recommendation=recommendation,
        fuel_saving=fuel_saving,
        co2_reduction=co2_reduction,
        alternate_route=None,
    )