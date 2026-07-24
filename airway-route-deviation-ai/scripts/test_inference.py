import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from backend.ml.inference.predictor import predict

sample = {
    "longitude": 77.5946,
    "latitude": 12.9716,
    "velocity": 220,
    "true_track": 180,
    "vertical_rate": 0,
    "baro_altitude": 9500,
    "geo_altitude": 9600,
}

prediction = predict(sample)

print(prediction)