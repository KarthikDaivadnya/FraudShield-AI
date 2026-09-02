from fastapi.testclient import TestClient

from fraudshield_api import app

client = TestClient(app)


def test_health():
    response = client.get("/health")

    assert response.status_code == 200

    data = response.json()

    assert data["status"] == "healthy"
    assert data["model"] == "Baseline Random Forest"
    assert data["decision_threshold"] == 0.21