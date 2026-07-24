"""
Utilities for saving and loading trained models.
"""

from pathlib import Path

import joblib


def save_model(model, output_path: Path):
    """
    Save a trained model to disk.
    """
    output_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, output_path)


def load_model(model_path: Path):
    """
    Load a trained model from disk.
    """
    return joblib.load(model_path)