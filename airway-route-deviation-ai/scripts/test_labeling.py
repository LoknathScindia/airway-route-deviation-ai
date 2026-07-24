import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from backend.ml.preprocessing import preprocess_data
from backend.ml.labeling import create_labels

dataset = Path("data/raw/opensky_states_snapshot.csv")

df = preprocess_data(dataset)

df = create_labels(df)

print(df["deviation"].value_counts())
print(df.head())