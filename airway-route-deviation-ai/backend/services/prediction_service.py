from backend.ml.inference.predictor import predict
from backend.utils.logger import logger
from backend.database.crud import (
    create_prediction,
    get_predictions,
    get_prediction_by_id,
    update_prediction,
    delete_prediction,
)

from backend.routing.flight_analysis import analyze_flight


def predict_flight(data):
    logger.info("Received prediction request.")

    features = {
        "longitude": data["longitude"],
        "latitude": data["latitude"],
        "velocity": data["velocity"],
        "true_track": data["true_track"],
        "vertical_rate": data["vertical_rate"],
        "baro_altitude": data["baro_altitude"],
        "geo_altitude": data["geo_altitude"],
    }

    result = predict(features)

    status = (
        "Route Deviation"
        if result["prediction"] == 1
        else "Normal Flight"
    )

    analysis = analyze_flight(
        prediction=result["prediction"],
        confidence=result["confidence"],
        velocity=data["velocity"],
        vertical_rate=data["vertical_rate"],
    )

    prediction_record = {
        "departure_airport": data["departure_airport"],
        "destination_airport": data["destination_airport"],
        "longitude": data["longitude"],
        "latitude": data["latitude"],
        "velocity": data["velocity"],
        "true_track": data["true_track"],
        "vertical_rate": data["vertical_rate"],
        "baro_altitude": data["baro_altitude"],
        "geo_altitude": data["geo_altitude"],
        "prediction": result["prediction"],
        "confidence": result["confidence"],
        "status": status,
    }

    create_prediction(prediction_record)

    logger.info(
        "Prediction=%s Confidence=%.2f Status=%s",
        result["prediction"],
        result["confidence"],
        status,
    )

    return {
        "prediction": result["prediction"],
        "confidence": result["confidence"],
        "status": status,
        "risk_level": analysis["risk_level"],
        "reason": analysis["reason"],
        "recommendation": analysis["recommendation"],
        "fuel_saving": analysis["fuel_saving"],
        "co2_reduction": analysis["co2_reduction"],
    }


def get_prediction_history():
    return get_predictions()


def get_prediction(prediction_id: int):
    return get_prediction_by_id(prediction_id)


def update_prediction_review(prediction_id: int, data: dict):
    return update_prediction(prediction_id, data)


def delete_prediction_record(prediction_id: int):
    return delete_prediction(prediction_id)