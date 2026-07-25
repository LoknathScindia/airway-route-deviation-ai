from datetime import datetime

from sqlalchemy import Column, DateTime, Float, Integer, String

from backend.database.database import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)

    longitude = Column(Float, nullable=False)
    latitude = Column(Float, nullable=False)
    velocity = Column(Float, nullable=False)
    true_track = Column(Float, nullable=False)
    vertical_rate = Column(Float, nullable=False)
    baro_altitude = Column(Float, nullable=False)
    geo_altitude = Column(Float, nullable=False)

    prediction = Column(Integer, nullable=False)
    confidence = Column(Float, nullable=False)
    status = Column(String, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)