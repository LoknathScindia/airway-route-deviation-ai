from backend.database.database import SessionLocal
from backend.database.models import Prediction


def create_prediction(data: dict):
    db = SessionLocal()

    try: 
        prediction = Prediction(**data)
        db.add(prediction)
        db.commit()
        db.refresh(prediction)
        return prediction

    finally:
        db.close()
def get_predictions():
    db = SessionLocal()

    try:
        predictions = db.query(Prediction).all()

        return predictions

    finally:
        db.close()
def get_prediction_by_id(prediction_id: int):
    db = SessionLocal()

    try:
        return (
            db.query(Prediction)
            .filter(Prediction.id == prediction_id)
            .first()
        )

    finally:
        db.close()
def update_prediction(prediction_id: int, data: dict):
    db = SessionLocal()

    try:
        prediction = (
            db.query(Prediction)
            .filter(Prediction.id == prediction_id)
            .first()
        )

        if prediction is None:
            return None

        prediction.review_status = data["review_status"]
        prediction.notes = data["notes"]

        db.commit()
        db.refresh(prediction)

        return prediction

    finally:
        db.close()
def delete_prediction(prediction_id: int):
    db = SessionLocal()

    try:
        prediction = (
            db.query(Prediction)
            .filter(Prediction.id == prediction_id)
            .first()
        )

        if prediction is None:
            return None

        db.delete(prediction)
        db.commit()

        return prediction

    finally:
        db.close()
