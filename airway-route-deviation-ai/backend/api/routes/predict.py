from fastapi import APIRouter, HTTPException, Depends

from backend.auth.dependencies import get_current_user

from backend.api.schemas import (
    PredictionRequest,
    PredictionResponse,
    PredictionUpdateRequest,
    PredictionRecordResponse,
)

from backend.services.prediction_service import (
    predict_flight,
    get_prediction_history,
    get_prediction,
    update_prediction_review,
    delete_prediction_record,
)

from backend.routing.alternate_route import get_alternate_route

router = APIRouter()


@router.post("/predict", response_model=PredictionResponse)
def predict_route(request: PredictionRequest):
    """
    Predict whether a flight is likely to deviate from its planned route.
    """

    data = request.model_dump()

    result = predict_flight(data)

    alternate_route = None

    if result["prediction"] == 1:
        alternate_route = get_alternate_route(
            departure=request.departure_airport,
            destination=request.destination_airport,
        )

    return PredictionResponse(
        prediction=result["prediction"],
        confidence=result["confidence"],
        status=result["status"],
        risk_level=result["risk_level"],
        reason=result["reason"],
        recommendation=result["recommendation"],
        fuel_saving=result["fuel_saving"],
        co2_reduction=result["co2_reduction"],
        alternate_route=alternate_route,
    )


@router.get(
    "/predictions",
    response_model=list[PredictionRecordResponse],
)
def get_predictions():
    return get_prediction_history()


@router.get(
    "/predictions/{prediction_id}",
    response_model=PredictionRecordResponse,
)
def get_prediction_by_id_route(prediction_id: int):
    prediction = get_prediction(prediction_id)

    if prediction is None:
        raise HTTPException(
            status_code=404,
            detail="Prediction not found",
        )

    return prediction


@router.put("/predictions/{prediction_id}")
def update_prediction(
    prediction_id: int,
    request: PredictionUpdateRequest,
    current_user=Depends(get_current_user),
):
    prediction = update_prediction_review(
        prediction_id,
        request.model_dump(),
    )

    if prediction is None:
        raise HTTPException(
            status_code=404,
            detail="Prediction not found",
        )

    return {
        "id": prediction.id,
        "review_status": prediction.review_status,
        "notes": prediction.notes,
    }


@router.delete("/predictions/{prediction_id}")
def delete_prediction(
    prediction_id: int,
    current_user=Depends(get_current_user),
):
    prediction = delete_prediction_record(prediction_id)

    if prediction is None:
        raise HTTPException(
            status_code=404,
            detail="Prediction not found",
        )

    return {
        "message": "Prediction deleted successfully"
    }