"""
Prediction utilities.
"""
from backend.config.settings import MODEL_PATH

import pandas as pd

from backend.ml.training.model_io import load_model


# Load the model only once when the module is imported
model = load_model(MODEL_PATH)


def predict(features: dict):
    """
    Predict whether an aircraft is deviating from its route.
    """

    input_df = pd.DataFrame([features])

    prediction = model.predict(input_df)[0]

    probabilities = model.predict_proba(input_df)[0]

    confidence = float(max(probabilities))

    return {
        "prediction": int(prediction),
        "confidence": confidence,
    }