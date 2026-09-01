const ROWS = [
  { key: "transaction_type", label: "Type" },
  { key: "amount", label: "Amount" },
  { key: "oldbalanceOrg", label: "Origin balance before" },
  { key: "newbalanceOrig", label: "Origin balance after" },
  { key: "oldbalanceDest", label: "Destination balance before" },
  { key: "newbalanceDest", label: "Destination balance after" },
  { key: "destination_account_type", label: "Destination type" },
];

function formatValue(key, value) {
  if (["transaction_type", "destination_account_type"].includes(key)) return value;
  const n = Number(value);
  return Number.isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: 2 }) : value;
}

export default function TransactionSummary({ transaction }) {
  return (
    <div className="panel p-4">
      <h3 className="mb-3 font-display text-sm font-semibold text-ledger-100">
        Transaction summary
      </h3>
      <dl className="space-y-1.5">
        {ROWS.map((row) => (
          <div key={row.key} className="flex items-center justify-between text-[13px]">
            <dt className="text-ledger-400">{row.label}</dt>
            <dd className="font-mono text-ledger-100 tabular">
              {formatValue(row.key, transaction[row.key])}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
