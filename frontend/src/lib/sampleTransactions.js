// Every value below is a real row pulled from Fraud_Analysis_Dataset.csv or
// one of the notebook's production-test cells (fraudshield_ai.ipynb,
// cells 421/432/434) — nothing here is invented.

export const SAMPLE_TRANSACTIONS = [
  {
    id: "detected-fraud",
    label: "Detected fraud",
    description: "Full CASH_OUT depletion — the model flags this at ~1.00 probability.",
    tone: "alert",
    transaction: {
      amount: 42789.93,
      transaction_type: "CASH_OUT",
      oldbalanceOrg: 42789.93,
      newbalanceOrig: 0.0,
      oldbalanceDest: 0.0,
      newbalanceDest: 42789.93,
      destination_account_type: "Customer",
    },
  },
  {
    id: "known-false-negative",
    label: "Known false negative",
    description: "A documented model limitation — zero origin balance, no depletion signal to key on.",
    tone: "watch",
    transaction: {
      amount: 23292.3,
      transaction_type: "CASH_OUT",
      oldbalanceOrg: 0.0,
      newbalanceOrig: 0.0,
      oldbalanceDest: 392364.62,
      newbalanceDest: 415656.92,
      destination_account_type: "Customer",
    },
  },
  {
    id: "legit-payment",
    label: "Legitimate payment",
    description: "Ordinary merchant PAYMENT — origin balance only partially moves.",
    tone: "clear",
    transaction: {
      amount: 9839.64,
      transaction_type: "PAYMENT",
      oldbalanceOrg: 170136.0,
      newbalanceOrig: 160296.36,
      oldbalanceDest: 0.0,
      newbalanceDest: 0.0,
      destination_account_type: "Merchant",
    },
  },
  {
    id: "legit-cashout",
    label: "Legitimate cash-out",
    description: "CASH_OUT that doesn't fully drain the origin account.",
    tone: "clear",
    transaction: {
      amount: 229133.94,
      transaction_type: "CASH_OUT",
      oldbalanceOrg: 15325.0,
      newbalanceOrig: 0.0,
      oldbalanceDest: 5083.0,
      newbalanceDest: 51513.44,
      destination_account_type: "Customer",
    },
  },
];

export const BLANK_TRANSACTION = {
  amount: "",
  transaction_type: "CASH_OUT",
  oldbalanceOrg: "",
  newbalanceOrig: "",
  oldbalanceDest: "",
  newbalanceDest: "",
  destination_account_type: "Customer",
};
