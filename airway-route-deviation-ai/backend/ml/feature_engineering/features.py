"""
Feature engineering utilities.
"""
print("Loading features.py")
import pandas as pd


def select_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Select the features used for model training.
    """

    selected_features = [
        "longitude",
        "latitude",
        "velocity",
        "true_track",
        "vertical_rate",
        "baro_altitude",
        "geo_altitude",
    ]

    return df[selected_features]
