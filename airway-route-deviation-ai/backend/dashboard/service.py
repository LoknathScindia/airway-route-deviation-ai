from sqlalchemy import func

from backend.database.session import SessionLocal
from backend.database.models import Prediction


def get_dashboard_stats():
    db = SessionLocal()

    try:
        total_predictions = db.query(Prediction).count()

        normal_flights = (
            db.query(Prediction)
            .filter(Prediction.prediction == 0)
            .count()
        )

        route_deviations = (
            db.query(Prediction)
            .filter(Prediction.prediction == 1)
            .count()
        )

        average_confidence = (
            db.query(func.avg(Prediction.confidence))
            .scalar()
        )

        return {
            "total_predictions": total_predictions,
            "normal_flights": normal_flights,
            "route_deviations": route_deviations,
            "average_confidence": round(
                average_confidence or 0,
                2,
            ),
        }

    finally:
        db.close()