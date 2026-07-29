from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi

from backend.api.routes.predict import router as predict_router
from backend.api.routes.health import router as health_router
from backend.api.routes.airports import router as airports_router
from backend.api.routes.live_flights import router as live_flights_router
from backend.api.routes.live_predict import router as live_predict_router

from backend.api.exceptions.handlers import register_exception_handlers
from backend.dashboard.router import router as dashboard_router
from backend.auth.routes import router as auth_router

from backend.database.database import Base, engine
from backend.database.models import Prediction
from backend.database.models.user import User

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Airway Route Deviation Prediction API",
    version="1.0.0",
)

# -----------------------------
# CORS Configuration
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_exception_handlers(app)


@app.get("/")
def root():
    return {"message": "API is running!"}


# -----------------------------
# Register Routers
# -----------------------------
app.include_router(auth_router)
app.include_router(predict_router)
app.include_router(health_router)
app.include_router(airports_router)
app.include_router(dashboard_router)
app.include_router(live_flights_router)
app.include_router(live_predict_router)


# -----------------------------
# Custom OpenAPI
# -----------------------------
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        description="Airway Route Deviation Prediction System",
        routes=app.routes,
    )

    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
        }
    }

    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi