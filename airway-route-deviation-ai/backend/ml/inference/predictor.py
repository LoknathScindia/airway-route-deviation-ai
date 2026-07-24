"""
Prediction utilities.
"""

from pathlib import Path

import pandas as pd

from backend.ml.training.model_io import load_model


MODEL_PATH = Path("models/route_deviation_model.pkl")


def predict(features: dict):
    """
    Predict whether an aircraft is deviating from its route.

    Parameters
    ----------
    features : dict
        Dictionary containing the seven numerical features.

    Returns
    -------
    int
        0 = Normal
        1 = Route deviation
    """

    model = load_model(MODEL_PATH)

    input_df = pd.DataFrame([features])

    prediction = model.predict(input_df)

    return int(prediction[0])