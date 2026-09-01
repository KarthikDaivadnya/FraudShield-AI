# FraudShield AI

A production-shaped fraud detection system: a Random Forest classifier
trained on simulated mobile-money transactions, served behind a FastAPI
backend, and operated through a 5-page React console.

```
Data (Fraud_Analysis_Dataset.csv)
        │
        ▼
fraudshield_ai.ipynb   — EDA → feature engineering → model comparison
        │                → threshold optimization → SHAP → export
        ▼
fraudshield_final_rf_pipeline.joblib
fraudshield_model_metadata.joblib
        │
        ▼
fraudshield_api.py (FastAPI)  ──/predict──▶  fraudshield-frontend (React)
```

## Results

Final held-out test set — 1,672 transactions, 172 of them fraudulent,
untouched until the very last evaluation step:

| Metric | Score |
|---|---|
| Accuracy | 99.82% |
| Precision | 98.84% |
| Recall | 99.42% |
| F1 score | 99.13% |
| ROC-AUC | 99.96% |
| PR-AUC | 99.80% |
| Fraud-amount capture rate | 99.99% |

Confusion matrix: 171 true positives, 2 false positives, 1 false
negative, 1,498 true negatives.

**Known limitation:** the single false negative has `oldbalanceOrg = 0`,
which blinds the model's strongest signal family (origin-balance-based
features — `origin_balance_fully_depleted` alone carries the highest SHAP
weight of any feature). The transaction's destination balance moves by
exactly the transaction amount, a mule-account pattern the model doesn't
currently see because the destination-side mirror features
(`destination_balance_match`, `destination_balance_error`) were engineered
as candidates but dropped before the final 16-feature pipeline. This is
documented rather than silently accepted — see Model Insights in the
frontend for the full breakdown.

## Repository layout

```
FraudShield-AI/
├── fraudshield_ai.ipynb                  training notebook (source of truth)
├── Fraud_Analysis_Dataset.csv            11,142 transactions, 10.25% fraud
├── description.txt                       dataset column reference
├── fraudshield_api.py                    FastAPI inference service
├── fraudshield_production/
│   ├── fraudshield_rf_pipeline.joblib    fitted sklearn Pipeline
│   └── decision_threshold.joblib         0.21
├── requirements.txt                      pinned Python dependencies
├── README.md                             this file
└── fraudshield-frontend/                 React console (5 pages)
    ├── README.md                         frontend-specific setup notes
    └── src/
```

## Model

- **Algorithm:** Random Forest (`n_estimators=400`, `min_samples_leaf=2`,
  `class_weight="balanced"`, `random_state=42`)
- **Training data:** 11,142 transactions, stratified 70/15/15 split into
  train (7,799) / validation (1,671) / test (1,672)
- **Features:** 23 engineered candidates reduced to 16 after
  preprocessing — 5 raw balance/amount fields, 6 engineered balance-
  consistency signals (`origin_balance_change`, `origin_balance_error`,
  `abs_origin_balance_error`, `origin_balance_match`,
  `origin_balance_fully_depleted`, `origin_balance_zero`), and one-hot
  encodings of `type` and `destination_account_type`
- **Decision threshold:** 0.21 — the F1-maximizing operating point found
  by sweeping thresholds against the validation set (100% precision,
  98.25% recall at that point); thresholds below 0.21 don't recover any
  further true positives, so it wasn't tuned further
- **Explainability:** SHAP (`TreeExplainer`) confirms the top signal is
  whether the origin account was fully drained, followed by the post-
  transaction origin balance and the balance-reconciliation error terms

## Setup

### 1. Environment

```bash
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Backend

```bash
uvicorn fraudshield_api:app --reload
```

Requires `fraudshield_production/fraudshield_rf_pipeline.joblib` and
`fraudshield_production/decision_threshold.joblib` on disk, exactly as
`fraudshield_api.py` already expects.

Add CORS before the frontend can reach it from a browser (not in the
file by default):

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 3. Frontend

```bash
cd fraudshield-frontend
npm install
npm run dev
```

Full page-by-page breakdown and data provenance are in
`fraudshield-frontend/README.md`.

## API reference

| Method | Path | Purpose |
|---|---|---|
| GET | `/` | App metadata, model name, endpoint index |
| GET | `/health` | Liveness + current model + decision threshold |
| POST | `/predict` | Score one transaction |

**`POST /predict`** request body:

```json
{
  "amount": 42789.93,
  "transaction_type": "CASH_OUT",
  "oldbalanceOrg": 42789.93,
  "newbalanceOrig": 0.0,
  "oldbalanceDest": 0.0,
  "newbalanceDest": 42789.93,
  "destination_account_type": "Customer"
}
```

`transaction_type` must be one of `CASH_IN`, `CASH_OUT`, `DEBIT`,
`PAYMENT`, `TRANSFER`; `destination_account_type` one of `Customer`,
`Merchant` — these are the exact categories the model was trained on.

Response:

```json
{
  "fraud_probability": 1.0,
  "prediction": 1,
  "decision": "FRAUD",
  "risk_level": "HIGH",
  "decision_threshold": 0.21
}
```

## Notes

- Dataset, notebook, and model artifacts are used exactly as provided —
  nothing here was retrained or re-engineered to produce this README or
  the frontend.
- The dataset is a simulated (PaySim-style) mobile-money dataset;
  performance here reflects that simulation and should be re-validated
  before any use on real transaction data.
