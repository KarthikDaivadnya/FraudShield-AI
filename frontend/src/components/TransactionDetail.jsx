import { X } from "lucide-react";
import Gauge from "./Gauge.jsx";
import SignalBreakdown from "./SignalBreakdown.jsx";

const RISK_STYLES = {
  HIGH: "text-signal-alert border-signal-alert/60 bg-signal-alert/10",
  MEDIUM: "text-signal-watch border-signal-watch/60 bg-signal-watch/10",
  LOW: "text-signal-clear border-signal-clear/60 bg-signal-clear/10",
};

export default function TransactionDetail({ entry, onClose }) {
  if (!entry) {
    return (
      <div className="panel flex h-full min-h-[280px] items-center justify-center p-6 text-center text-sm text-ledger-500">
        Select a row to inspect its full breakdown.
      </div>
    );
  }

  const { transaction, result } = entry;

  return (
    <div className="panel p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold text-ledger-100">
          Transaction detail
        </h3>
        <button
          onClick={onClose}
          className="text-ledger-500 hover:text-ledger-200 transition-colors"
          aria-label="Close detail panel"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col items-center gap-3 border-b border-ledger-700/60 pb-5">
        <Gauge probability={result.fraud_probability} threshold={result.decision_threshold} size={200} />
        <div className="flex items-center gap-2 text-xs">
          <span
            className={`rounded-full border px-2.5 py-1 font-mono ${
              RISK_STYLES[result.risk_level] || RISK_STYLES.LOW
            }`}
          >
            {result.decision} · {result.risk_level}
          </span>
        </div>
      </div>

      <dl className="mt-4 space-y-1.5 border-b border-ledger-700/60 pb-4 text-[13px]">
        {[
          ["Type", transaction.transaction_type],
          ["Amount", transaction.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })],
          ["Origin before", transaction.oldbalanceOrg.toLocaleString(undefined, { maximumFractionDigits: 2 })],
          ["Origin after", transaction.newbalanceOrig.toLocaleString(undefined, { maximumFractionDigits: 2 })],
          ["Destination before", transaction.oldbalanceDest.toLocaleString(undefined, { maximumFractionDigits: 2 })],
          ["Destination after", transaction.newbalanceDest.toLocaleString(undefined, { maximumFractionDigits: 2 })],
          ["Destination type", transaction.destination_account_type],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between">
            <dt className="text-ledger-400">{label}</dt>
            <dd className="font-mono text-ledger-100 tabular">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4">
        <SignalBreakdown
          transaction={{
            amount: String(transaction.amount),
            oldbalanceOrg: String(transaction.oldbalanceOrg),
            newbalanceOrig: String(transaction.newbalanceOrig),
          }}
        />
      </div>
    </div>
  );
}
