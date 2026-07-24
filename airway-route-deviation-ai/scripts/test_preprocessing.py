import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from backend.ml.preprocessing import preprocess_data

dataset = Path("data/raw/opensky_states_snapshot.csv")

df = preprocess_data(dataset)

print(df.shape)
print(df.head())