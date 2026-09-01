import { useState } from "react";
import TransactionForm from "../components/TransactionForm.jsx";
import VerdictPanel from "../components/VerdictPanel.jsx";
import SampleStrip from "../components/SampleStrip.jsx";
import SignalBreakdown from "../components/SignalBreakdown.jsx";
import TransactionSummary from "../components/TransactionSummary.jsx";
import { BLANK_TRANSACTION } from "../lib/sampleTransactions.js";
import { predictTransaction } from "../lib/api.js";
import { MODEL_METADATA } from "../lib/modelMetadata.js";
import { useAnalysisHistory } from "../hooks/useAnalysisHistory.jsx";

export default function Analyzer() {
  const [transaction, setTransaction] = useState(BLANK_TRANSACTION);
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [activeSampleId, setActiveSampleId] = useState(null);
  const [threshold, setThreshold] = useState(MODEL_METADATA.decisionThreshold);
  const { addEntry } = useAnalysisHistory();

  function handleChange(next) {
    setTransaction(next);
    setActiveSampleId(null);
  }

  function handleSample(sample) {
    setTransaction({
      ...sample.transaction,
      amount: String(sample.transaction.amount),
      oldbalanceOrg: String(sample.transaction.oldbalanceOrg),
      newbalanceOrig: String(sample.transaction.newbalanceOrig),
      oldbalanceDest: String(sample.transaction.oldbalanceDest),
      newbalanceDest: String(sample.transaction.newbalanceDest),
    });
    setActiveSampleId(sample.id);
    setStatus("idle");
    setResult(null);
  }

  function handleReset() {
    setTransaction(BLANK_TRANSACTION);
    setActiveSampleId(null);
    setStatus("idle");
    setResult(null);
    setError(null);
  }

  async function handleSubmit() {
    setStatus("loading");
    setError(null);
    try {
      const payload = {
        amount: Number(transaction.amount),
        transaction_type: transaction.transaction_type,
        oldbalanceOrg: Number(transaction.oldbalanceOrg),
        newbalanceOrig: Number(transaction.newbalanceOrig),
        oldbalanceDest: Number(transaction.oldbalanceDest),
        newbalanceDest: Number(transaction.newbalanceDest),
        destination_account_type: transaction.destination_account_type,
      };
      const res = await predictTransaction(payload);
      setResult(res);
      setThreshold(res.decision_threshold);
      setStatus("done");
      addEntry(payload, res);
    } catch (err) {
      setError(err.message || "Unknown error");
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <section>
        <h1 className="font-display text-2xl font-semibold text-ledger-100 sm:text-3xl">
          Transaction Analyzer
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ledger-400">
          Enter a transaction or load a known case. The request goes straight to your
          running FastAPI backend's <code className="text-ledger-300">/predict</code>{" "}
          endpoint and every result is added to Fraud Investigation.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        <div className="flex flex-col gap-5 lg:col-span-3">
          <SampleStrip onSelect={handleSample} activeId={activeSampleId} />
          <TransactionForm
            transaction={transaction}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onReset={handleReset}
            submitting={status === "loading"}
          />
          <SignalBreakdown transaction={transaction} />
        </div>

        <div className="flex flex-col gap-5 lg:col-span-2">
          <VerdictPanel status={status} result={result} error={error} threshold={threshold} />
          {status === "done" && result && <TransactionSummary transaction={transaction} />}
        </div>
      </section>
    </div>
  );
}
