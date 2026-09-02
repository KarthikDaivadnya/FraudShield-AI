from fastapi.testclient import TestClient

from fraudshield_api import app

client = TestClient(app)


def test_negative_amount_rejected():
    transaction = {
        "amount": -5000,
        "transaction_type": "CASH_OUT",
        "oldbalanceOrg": 5000,
        "newbalanceOrig": 0,
        "oldbalanceDest": 0,
        "newbalanceDest": 5000,
        "destination_account_type": "Customer",
    }

    response = client.post("/predict", json=transaction)

    assert response.status_code == 422