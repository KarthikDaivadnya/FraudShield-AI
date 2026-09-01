import { SAMPLE_TRANSACTIONS } from "../lib/sampleTransactions.js";

const DOT_STYLES = {
  alert: "bg-signal-alert",
  watch: "bg-signal-watch",
  clear: "bg-signal-clear",
};

export default function SampleStrip({ onSelect, activeId }) {
  return (
    <div className="panel p-4">
      <h3 className="mb-3 font-display text-sm font-semibold text-ledger-100">
        Load a known case
      </h3>
      <div className="flex flex-wrap gap-2">
        {SAMPLE_TRANSACTIONS.map((sample) => (
          <button
            key={sample.id}
            onClick={() => onSelect(sample)}
            className={`group flex items-center gap-2 rounded-md border px-3 py-2 text-left text-xs transition-colors ${
              activeId === sample.id
                ? "border-wire/60 bg-wire/10 text-ledger-100"
                : "border-ledger-600 bg-ledger-900/60 text-ledger-300 hover:border-ledger-400"
            }`}
            title={sample.description}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${DOT_STYLES[sample.tone]}`} />
            {sample.label}
          </button>
        ))}
      </div>
      {activeId && (
        <p className="mt-3 text-[11px] text-ledger-500">
          {SAMPLE_TRANSACTIONS.find((s) => s.id === activeId)?.description}
        </p>
      )}
    </div>
  );
}
