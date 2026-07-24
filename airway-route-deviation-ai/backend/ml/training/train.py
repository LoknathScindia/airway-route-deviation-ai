"""
Model training utilities.
"""

import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
def train_model(X_train, y_train):
    """
    Train a Random Forest classifier.
    """

    model = RandomForestClassifier(
        n_estimators=100,
        random_state=42,
    )

    model.fit(X_train, y_train)

    return model
def evaluate_model(model, X_test, y_test):
    """
    Evaluate the trained model.
    """

    predictions = model.predict(X_test)

    print(confusion_matrix(y_test, predictions))
    print(classification_report(y_test, predictions))
def split_dataset(df: pd.DataFrame):
    """
    Split the dataset into training and testing sets.
    """

    feature_columns = [
        "longitude",
        "latitude",
        "velocity",
        "true_track",
        "vertical_rate",
        "baro_altitude",
        "geo_altitude",
    ]

    X = df[feature_columns]
    y = df["deviation"]

    return train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y,
    )