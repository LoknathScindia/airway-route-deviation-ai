from fastapi import FastAPI
from core.config import settings
from core.logging import logger

app = FastAPI(
    title="Airway Route Deviation AI",
    description="API for detecting and analyzing airway route deviations",
    version="0.1.0"
)

@app.on_event("startup")
async def startup_event():
    logger.info(f"Starting API on {settings.API_HOST}:{settings.API_PORT}")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down API")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=settings.DEBUG
    )
