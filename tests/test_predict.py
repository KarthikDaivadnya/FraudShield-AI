from fastapi.testclient import TestClient

from fraudshield_api import app

client = TestClient(app)


def test_fraud_prediction():
    transaction = {
        "amount": 42789.93,
        "transaction_type": "CASH_OUT",
        "oldbalanceOrg": 42789.93,
        "newbalanceOrig": 0,
        "oldbalanceDest": 0,
        "newbalanceDest": 42789.93,
        "destination_account_type": "Customer",
    }

    response = client.post("/predict", json=transaction)

    assert response.status_code == 200

    data = response.json()

    assert "fraud_probability" in data
    assert "prediction" in data
    assert "decision" in data
    assert "risk_level" in data
    assert "decision_threshold" in data

    assert 0 <= data["fraud_probability"] <= 1
    assert data["decision_threshold"] == 0.21