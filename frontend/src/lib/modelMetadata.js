// Sourced verbatim from fraudshield_model_metadata.joblib and from
// fraudshield_ai.ipynb's printed cell outputs (Levels 1–13). Nothing here
// is estimated — see the cell references in each comment.

export const MODEL_METADATA = {
  model: "Baseline Random Forest",
  pipeline: "rf_pipeline",
  decisionThreshold: 0.21,
  testSamples: 1672,
  testFraudTransactions: 172,
  accuracy: 0.998206,
  precision: 0.988439,
  recall: 0.994186,
  f1: 0.991304,
  rocAuc: 0.999647,
  prAuc: 0.997988,
  truePositives: 171,
  falsePositives: 2,
  falseNegatives: 1,
  trueNegatives: 1498,
  fraudAmountCaptureRate: 0.999869,
};

// EDA Finding 1 — fraud rate by transaction type, computed directly from
// Fraud_Analysis_Dataset.csv (11,142 rows). Only TRANSFER and CASH_OUT
// ever carry a fraud label in this dataset.
export const FRAUD_RATE_BY_TYPE = [
  { type: "TRANSFER", count: 1464, fraud: 564, ratePct: 38.52 },
  { type: "CASH_OUT", count: 1871, fraud: 578, ratePct: 30.89 },
  { type: "CASH_IN", count: 1951, fraud: 0, ratePct: 0.0 },
  { type: "PAYMENT", count: 5510, fraud: 0, ratePct: 0.0 },
  { type: "DEBIT", count: 346, fraud: 0, ratePct: 0.0 },
];

export const DATASET_SUMMARY = {
  rows: 11142,
  columns: 10,
  fraudRatePct: 10.25,
  legitimateRatePct: 89.75,
  fraudCount: 1142,
};

// Notebook cell 194 — stratified 70/15/15 split, random_state=42.
export const SPLIT_SUMMARY = [
  { name: "Train", samples: 7799, fraud: 799, fraudRatePct: 10.24 },
  { name: "Validation", samples: 1671, fraud: 171, fraudRatePct: 10.23 },
  { name: "Test", samples: 1672, fraud: 172, fraudRatePct: 10.29 },
];

// Notebook cells 192, 195, 231, 379, 380 — final production pipeline.
export const MODEL_CONFIG = {
  algorithm: "Random Forest Classifier",
  nEstimators: 400,
  minSamplesLeaf: 2,
  classWeight: "balanced",
  randomState: 42,
  candidateFeatures: 23,
  numericalFeatures: 21,
  categoricalFeatures: 2,
  encodedFeatures: 16,
  preprocessing:
    "ColumnTransformer — passthrough numeric, one-hot encode (drop-first) type & destination_account_type",
  pipelineFile: "fraudshield_final_rf_pipeline.joblib",
  metadataFile: "fraudshield_model_metadata.joblib",
};

// Notebook cell 380 — the 16 features the classifier actually sees after
// preprocessing (one-hot columns expanded).
export const ENCODED_FEATURE_NAMES = [
  "amount",
  "oldbalanceOrg",
  "newbalanceOrig",
  "oldbalanceDest",
  "newbalanceDest",
  "origin_balance_change",
  "origin_balance_error",
  "abs_origin_balance_error",
  "origin_balance_match",
  "origin_balance_fully_depleted",
  "origin_balance_zero",
  "type_CASH_OUT",
  "type_DEBIT",
  "type_PAYMENT",
  "type_TRANSFER",
  "destination_account_type_Merchant",
];
