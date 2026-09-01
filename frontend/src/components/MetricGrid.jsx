import { MODEL_METADATA as M } from "../lib/modelMetadata.js";

const METRICS = [
  { label: "Accuracy", value: M.accuracy },
  { label: "Precision", value: M.precision },
  { label: "Recall", value: M.recall },
  { label: "F1 score", value: M.f1 },
  { label: "ROC-AUC", value: M.rocAuc },
  { label: "PR-AUC", value: M.prAuc },
];

export default function MetricGrid({ compact = false }) {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${compact ? "" : "lg:grid-cols-6"}`}>
      {METRICS.map((m) => (
        <div key={m.label} className="rounded-md border border-ledger-600 bg-ledger-900/50 p-3">
          <div className="font-mono text-xl font-semibold tabular text-ledger-100">
            {(m.value * 100).toFixed(2)}
            <span className="text-sm text-ledger-400">%</span>
          </div>
          <div className="mt-1 text-[11px] text-ledger-400">{m.label}</div>
        </div>
      ))}
    </div>
  );
}
