import joblib
import numpy as np
import pandas as pd

from fastapi import FastAPI
from pydantic import BaseModel, Field


MODEL_PATH = "fraudshield_production/fraudshield_rf_pipeline.joblib"
THRESHOLD_PATH = "fraudshield_production/decision_threshold.joblib"

model = joblib.load(MODEL_PATH)
threshold = joblib.load(THRESHOLD_PATH)


app = FastAPI(
    title="FraudShield-AI",
    description="Real-time financial transaction fraud detection API",
    version="1.0.0"
)


class TransactionRequest(BaseModel):
    amount: float = Field(gt=0)
    transaction_type: str
    oldbalanceOrg: float = Field(ge=0)
    newbalanceOrig: float = Field(ge=0)
    oldbalanceDest: float = Field(ge=0)
    newbalanceDest: float = Field(ge=0)
    destination_account_type: str


def create_features(transaction):

    origin_balance_change = (
        transaction.oldbalanceOrg -
        transaction.newbalanceOrig
    )

    origin_balance_error = (
        transaction.oldbalanceOrg -
        transaction.amount -
        transaction.newbalanceOrig
    )

    abs_origin_balance_error = abs(
        origin_balance_error
    )

    origin_balance_match = int(
        np.isclose(
            origin_balance_error,
            0.0,
            atol=1e-6
        )
    )

    origin_balance_fully_depleted = int(
        transaction.oldbalanceOrg > 0 and
        transaction.newbalanceOrig == 0
    )

    origin_balance_zero = int(
        transaction.oldbalanceOrg == 0
    )

    return pd.DataFrame([{
        "amount": transaction.amount,
        "oldbalanceOrg": transaction.oldbalanceOrg,
        "newbalanceOrig": transaction.newbalanceOrig,
        "oldbalanceDest": transaction.oldbalanceDest,
        "newbalanceDest": transaction.newbalanceDest,
        "origin_balance_change": origin_balance_change,
        "origin_balance_error": origin_balance_error,
        "abs_origin_balance_error": abs_origin_balance_error,
        "origin_balance_match": origin_balance_match,
        "origin_balance_fully_depleted": origin_balance_fully_depleted,
        "origin_balance_zero": origin_balance_zero,
        "type": transaction.transaction_type,
        "destination_account_type": transaction.destination_account_type
    }])

@app.get("/")
def root():
    return {
        "application": "FraudShield-AI",
        "status": "online",
        "version": "1.0.0",
        "model": "Baseline Random Forest",
        "decision_threshold": threshold,
        "endpoints": {
            "health": "/health",
            "predict": "/predict",
            "docs": "/docs"
        }
    }


@app.get("/health")
def health_check():

    return {
        "status": "healthy",
        "model": "Baseline Random Forest",
        "decision_threshold": threshold
    }


@app.post("/predict")
def predict_transaction(transaction: TransactionRequest):

    features = create_features(transaction)

    probability = float(
        model.predict_proba(features)[0, 1]
    )

    prediction = int(
        probability >= threshold
    )

    if probability >= 0.75:
        risk_level = "HIGH"
    elif probability >= threshold:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    return {
        "fraud_probability": probability,
        "prediction": prediction,
        "decision": (
            "FRAUD"
            if prediction == 1
            else "LEGITIMATE"
        ),
        "risk_level": risk_level,
        "decision_threshold": threshold
    }