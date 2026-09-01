import { MODEL_METADATA as M } from "../lib/modelMetadata.js";

const CONFUSION = [
  { label: "True positives", value: M.truePositives, tone: "text-signal-clear" },
  { label: "False positives", value: M.falsePositives, tone: "text-signal-watch" },
  { label: "False negatives", value: M.falseNegatives, tone: "text-signal-alert" },
  { label: "True negatives", value: M.trueNegatives, tone: "text-signal-clear" },
];

export default function ConfusionGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {CONFUSION.map((c) => (
        <div key={c.label} className="rounded-md border border-ledger-600 bg-ledger-900/30 p-3">
          <div className={`font-mono text-lg font-semibold tabular ${c.tone}`}>{c.value}</div>
          <div className="mt-1 text-[11px] text-ledger-400">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
