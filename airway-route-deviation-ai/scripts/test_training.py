print("Starting test_training.py")
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from backend.ml.preprocessing import preprocess_data
from backend.ml.labeling import create_labels
from backend.ml.training.train import (
    split_dataset,
    train_model,
    evaluate_model,
)
from backend.ml.training.model_io import save_model

dataset = Path("data/raw/opensky_states_snapshot.csv")

df = preprocess_data(dataset)
df = create_labels(df)

X_train, X_test, y_train, y_test = split_dataset(df)

model = train_model(X_train, y_train)
save_model(model, Path("models/route_deviation_model.pkl"))
print("Model trained successfully")
evaluate_model(model, X_test, y_test)