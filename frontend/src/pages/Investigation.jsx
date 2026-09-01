import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import TransactionTable from "../components/TransactionTable.jsx";
import TransactionDetail from "../components/TransactionDetail.jsx";
import { useAnalysisHistory } from "../hooks/useAnalysisHistory.jsx";

const TYPES = ["CASH_IN", "CASH_OUT", "DEBIT", "PAYMENT", "TRANSFER"];
const DECISIONS = ["FRAUD", "LEGITIMATE"];
const RISKS = ["HIGH", "MEDIUM", "LOW"];

export default function Investigation() {
  const { entries, clearHistory } = useAnalysisHistory();
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [decisionFilter, setDecisionFilter] = useState("ALL");
  const [riskFilter, setRiskFilter] = useState("ALL");
  const [sortKey, setSortKey] = useState("timestamp");
  const [sortDir, setSortDir] = useState("desc");
  const [selectedId, setSelectedId] = useState(null);

  const rows = useMemo(() => {
    return entries.map((e) => ({
      id: e.id,
      timestamp: e.timestamp,
      type: e.transaction.transaction_type,
      amount: e.transaction.amount,
      probability: e.result.fraud_probability,
      decision: e.result.decision,
      risk: e.result.risk_level,
    }));
  }, [entries]);

  const filtered = useMemo(() => {
    let out = rows;
    if (typeFilter !== "ALL") out = out.filter((r) => r.type === typeFilter);
    if (decisionFilter !== "ALL") out = out.filter((r) => r.decision === decisionFilter);
    if (riskFilter !== "ALL") out = out.filter((r) => r.risk === riskFilter);

    const dir = sortDir === "asc" ? 1 : -1;
    return [...out].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "string") return av.localeCompare(bv) * dir;
      return (av - bv) * dir;
    });
  }, [rows, typeFilter, decisionFilter, riskFilter, sortKey, sortDir]);

  function handleSort(key) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const selectedEntry = entries.find((e) => e.id === selectedId) || null;

  return (
    <div className="flex flex-col gap-5">
      <section>
        <h1 className="font-display text-2xl font-semibold text-ledger-100 sm:text-3xl">
          Fraud Investigation
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ledger-400">
          Every transaction you've scored from the Transaction Analyzer, in one sortable,
          filterable table. Click a row to inspect its full breakdown.
        </p>
      </section>

      {entries.length === 0 ? (
        <div className="panel flex flex-col items-center gap-3 p-10 text-center">
          <p className="text-sm text-ledger-400">
            Nothing analyzed yet this session.
          </p>
          <Link
            to="/analyze"
            className="rounded-md bg-wire px-4 py-2 text-xs font-semibold text-ledger-950 hover:bg-wire/90 transition-colors"
          >
            Go to Transaction Analyzer
          </Link>
        </div>
      ) : (
        <>
          <section className="panel flex flex-wrap items-center gap-3 p-4">
            <FilterSelect label="Type" value={typeFilter} onChange={setTypeFilter} options={TYPES} />
            <FilterSelect
              label="Decision"
              value={decisionFilter}
              onChange={setDecisionFilter}
              options={DECISIONS}
            />
            <FilterSelect label="Risk" value={riskFilter} onChange={setRiskFilter} options={RISKS} />

            <span className="ml-auto font-mono text-[11px] text-ledger-500">
              {filtered.length} of {entries.length} transactions
            </span>
            <button
              onClick={() => {
                clearHistory();
                setSelectedId(null);
              }}
              className="flex items-center gap-1.5 rounded-md border border-ledger-600 px-2.5 py-1.5 text-xs text-ledger-400 hover:border-signal-alert/50 hover:text-signal-alert transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear history
            </button>
          </section>

          <section className="grid grid-cols-1 gap-5 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <TransactionTable
                rows={filtered}
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-40">
                <TransactionDetail entry={selectedEntry} onClose={() => setSelectedId(null)} />
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="flex items-center gap-2 text-xs text-ledger-400">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-ledger-600 bg-ledger-900 px-2 py-1.5 font-mono text-xs text-ledger-100 focus:border-wire/70 focus:ring-1 focus:ring-wire/40"
      >
        <option value="ALL">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
