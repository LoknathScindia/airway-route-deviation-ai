from fastapi import FastAPI

from backend.api.routes.predict import router as predict_router
from backend.api.routes.health import router as health_router
from backend.api.exceptions.handlers import register_exception_handlers

app = FastAPI(
    title="Airway Route Deviation Prediction API",
    version="1.0.0"
)
register_exception_handlers(app)

@app.get("/")
def root():
    return {"message": "API is running!"}


app.include_router(predict_router)
app.include_router(health_router)