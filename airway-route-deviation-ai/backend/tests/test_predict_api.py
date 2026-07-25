from fastapi.testclient import TestClient

from backend.api.main import app

client = TestClient(app)


def test_predict_endpoint():
    payload = {
        "longitude": 77.5946,
        "latitude": 12.9716,
        "velocity": 220,
        "true_track": 180,
        "vertical_rate": 0,
        "baro_altitude": 9500,
        "geo_altitude": 9600,
    }

    response = client.post("/predict", json=payload)

    assert response.status_code == 200

    data = response.json()

    assert "prediction" in data
    assert "confidence" in data
    assert "status" in data

    assert isinstance(data["prediction"], int)
    assert isinstance(data["confidence"], float)
    assert isinstance(data["status"], str)