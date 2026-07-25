from backend.ml.inference.predictor import predict
from backend.utils.logger import logger
from backend.database.crud import create_prediction, get_predictions


def predict_flight(features):
    logger.info("Received prediction request.")

    result = predict(features)

    status = (
        "Route Deviation"
        if result["prediction"] == 1
        else "Normal Flight"
    )

    prediction_record = {
        "longitude": features["longitude"],
        "latitude": features["latitude"],
        "velocity": features["velocity"],
        "true_track": features["true_track"],
        "vertical_rate": features["vertical_rate"],
        "baro_altitude": features["baro_altitude"],
        "geo_altitude": features["geo_altitude"],
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
    }


def get_prediction_history():
    return get_predictions()