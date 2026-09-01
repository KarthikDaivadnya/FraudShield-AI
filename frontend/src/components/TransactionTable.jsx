import { ArrowUpDown } from "lucide-react";

const COLUMNS = [
  { key: "timestamp", label: "Time" },
  { key: "type", label: "Type" },
  { key: "amount", label: "Amount" },
  { key: "probability", label: "Probability" },
  { key: "decision", label: "Decision" },
  { key: "risk", label: "Risk" },
];

const DECISION_STYLES = {
  FRAUD: "text-signal-alert",
  LEGITIMATE: "text-signal-clear",
};

const RISK_STYLES = {
  HIGH: "border-signal-alert/60 bg-signal-alert/10 text-signal-alert",
  MEDIUM: "border-signal-watch/60 bg-signal-watch/10 text-signal-watch",
  LOW: "border-signal-clear/60 bg-signal-clear/10 text-signal-clear",
};

function fmtTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function TransactionTable({ rows, sortKey, sortDir, onSort, selectedId, onSelect }) {
  return (
    <div className="panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-ledger-600 text-[11px] uppercase tracking-wide text-ledger-500">
              {COLUMNS.map((col) => (
                <th key={col.key} className="px-4 py-3 font-normal">
                  <button
                    onClick={() => onSort(col.key)}
                    className="flex items-center gap-1 hover:text-ledger-300 transition-colors"
                  >
                    {col.label}
                    <ArrowUpDown
                      className={`h-3 w-3 ${sortKey === col.key ? "text-wire" : "text-ledger-600"}`}
                    />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => onSelect(row.id)}
                className={`cursor-pointer border-b border-ledger-700/60 transition-colors hover:bg-ledger-800/60 ${
                  selectedId === row.id ? "bg-wire/5" : ""
                }`}
              >
                <td className="px-4 py-3 font-mono text-[11px] text-ledger-400">
                  {fmtTime(row.timestamp)}
                </td>
                <td className="px-4 py-3 font-mono text-ledger-200">{row.type}</td>
                <td className="px-4 py-3 font-mono tabular text-ledger-100">
                  {row.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-3 font-mono tabular text-ledger-100">
                  {(row.probability * 100).toFixed(1)}%
                </td>
                <td className={`px-4 py-3 font-mono font-medium ${DECISION_STYLES[row.decision]}`}>
                  {row.decision}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full border px-2 py-0.5 font-mono text-[11px] ${RISK_STYLES[row.risk]}`}
                  >
                    {row.risk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
