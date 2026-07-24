"""
Utilities for creating route deviation labels.
"""

import pandas as pd


def create_labels(df: pd.DataFrame) -> pd.DataFrame:
    """
    Create binary labels indicating potential route deviation.
    """

    df = df.copy()

    df["deviation"] = (
        (df["vertical_rate"].abs() > 15) |
        (df["velocity"] > 350)
    ).astype(int)

    return df