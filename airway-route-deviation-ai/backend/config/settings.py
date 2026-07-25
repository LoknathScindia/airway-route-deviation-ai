from pathlib import Path

# Project root
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Directories
MODEL_DIR = BASE_DIR / "models"
DATA_DIR = BASE_DIR / "data"

# Models
MODEL_PATH = MODEL_DIR / "route_deviation_model.pkl"