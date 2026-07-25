from backend.database.database import Base, engine
from backend.database.models import Prediction

Base.metadata.create_all(bind=engine)

print("Database and tables created successfully!")