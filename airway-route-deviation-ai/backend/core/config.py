import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    """Application settings"""
    DEBUG: bool = os.getenv("DEBUG", "False") == "True"
    API_HOST: str = os.getenv("API_HOST", "localhost")
    API_PORT: int = int(os.getenv("API_PORT", 8000))
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./airway_ai.db")
    MODEL_PATH: str = os.getenv("MODEL_PATH", "./models/")
    RAW_DATA_PATH: str = os.getenv("RAW_DATA_PATH", "./data/raw/")
    PROCESSED_DATA_PATH: str = os.getenv("PROCESSED_DATA_PATH", "./data/processed/")

settings = Settings()
