"""
Data preprocessing utilities.
"""

from pathlib import Path

import pandas as pd


def load_dataset(file_path: str) -> pd.DataFrame:
    """Load a CSV dataset."""
    return pd.read_csv(Path(file_path))


def remove_unused_columns(df: pd.DataFrame) -> pd.DataFrame:
    """Remove columns that are not useful."""
    columns_to_drop = ["sensors", "squawk"]

    return df.drop(columns=columns_to_drop, errors="ignore")


def remove_missing_rows(df: pd.DataFrame) -> pd.DataFrame:
    """Remove rows containing missing values."""
    return df.dropna()


def preprocess_data(file_path: str) -> pd.DataFrame:
    """
    Complete preprocessing pipeline.
    """

    df = load_dataset(file_path)

    df = remove_unused_columns(df)

    df = remove_missing_rows(df)

    return df