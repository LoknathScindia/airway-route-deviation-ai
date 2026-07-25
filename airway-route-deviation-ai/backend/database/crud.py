from backend.database.database import SessionLocal
from backend.database.models import Prediction


def create_prediction(data: dict):
    db = SessionLocal()

    try:
        print("Saving to database:", data)  
        prediction = Prediction(**data)
        db.add(prediction)
        db.commit()
        db.refresh(prediction)
        print("Saved successfully!")  
        return prediction

    finally:
        db.close()
def get_predictions():
    db = SessionLocal()

    try:
        predictions = db.query(Prediction).all()

        print("Rows returned:", len(predictions))

        return predictions

    finally:
        db.close()