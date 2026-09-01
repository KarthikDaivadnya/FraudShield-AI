// Mirrors create_features() in fraudshield_api.py, line for line, so the
// console can show the same engineered signals the model actually sees.
// This is display-only — the raw transaction fields are what get POSTed
// to /predict; the backend re-derives these itself.

export function engineerSignals(t) {
  const amount = Number(t.amount) || 0;
  const oldbalanceOrg = Number(t.oldbalanceOrg) || 0;
  const newbalanceOrig = Number(t.newbalanceOrig) || 0;

  const originBalanceChange = oldbalanceOrg - newbalanceOrig;
  const originBalanceError = oldbalanceOrg - amount - newbalanceOrig;
  const absOriginBalanceError = Math.abs(originBalanceError);
  const originBalanceMatch = Math.abs(originBalanceError) < 1e-6 ? 1 : 0;
  const originBalanceFullyDepleted =
    oldbalanceOrg > 0 && newbalanceOrig === 0 ? 1 : 0;
  const originBalanceZero = oldbalanceOrg === 0 ? 1 : 0;

  return {
    originBalanceChange,
    originBalanceError,
    absOriginBalanceError,
    originBalanceMatch,
    originBalanceFullyDepleted,
    originBalanceZero,
  };
}
