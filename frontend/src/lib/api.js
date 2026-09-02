// Talks to the FraudShield-AI FastAPI backend (fraudshield_api.py).
// Endpoints and payload shapes here mirror that file exactly:
//   GET  /            -> app + endpoint info
//   GET  /health       -> { status, model, decision_threshold }
//   POST /predict      -> TransactionRequest -> { fraud_probability, prediction,
//                          decision, risk_level, decision_threshold }

export const DEFAULT_API_BASE = import.meta.env.VITE_API_URL;

export function getApiBase() {
  return localStorage.getItem("fraudshield_api_base") || DEFAULT_API_BASE;
}

export function setApiBase(url) {
  localStorage.setItem("fraudshield_api_base", url.replace(/\/+$/, ""));
}

async function request(path, options = {}) {
  const base = getApiBase();
  const res = await fetch(`${base}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  let body = null;
  try {
    body = await res.json();
  } catch {
    // no JSON body
  }

  if (!res.ok) {
    const detail =
      (body && (body.detail || body.message)) || `Request failed (${res.status})`;
    const message = Array.isArray(detail)
      ? detail.map((d) => d.msg || JSON.stringify(d)).join("; ")
      : detail;
    throw new Error(message);
  }

  return body;
}

export function fetchRoot() {
  return request("/");
}

export function fetchHealth() {
  return request("/health");
}

/**
 * @param {{
 *  amount: number,
 *  transaction_type: string,
 *  oldbalanceOrg: number,
 *  newbalanceOrig: number,
 *  oldbalanceDest: number,
 *  newbalanceDest: number,
 *  destination_account_type: string
 * }} transaction
 */
export function predictTransaction(transaction) {
  return request("/predict", {
    method: "POST",
    body: JSON.stringify(transaction),
  });
}
