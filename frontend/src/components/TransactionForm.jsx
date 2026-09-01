import { Send, RotateCcw } from "lucide-react";

const TRANSACTION_TYPES = ["CASH_IN", "CASH_OUT", "DEBIT", "PAYMENT", "TRANSFER"];
const DEST_TYPES = ["Customer", "Merchant"];

const NUMERIC_FIELDS = [
  { key: "amount", label: "Amount", hint: "must be greater than 0" },
  { key: "oldbalanceOrg", label: "Origin balance — before", hint: "≥ 0" },
  { key: "newbalanceOrig", label: "Origin balance — after", hint: "≥ 0" },
  { key: "oldbalanceDest", label: "Destination balance — before", hint: "≥ 0" },
  { key: "newbalanceDest", label: "Destination balance — after", hint: "≥ 0" },
];

export default function TransactionForm({
  transaction,
  onChange,
  onSubmit,
  onReset,
  submitting,
}) {
  function updateField(key, value) {
    onChange({ ...transaction, [key]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="panel p-6">
      <div className="mb-5 flex items-baseline justify-between">
        <h2 className="font-display text-base font-semibold text-ledger-100">
          Transaction intake
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs text-ledger-400 hover:text-wire transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label">Transaction type</label>
          <select
            className="field-input"
            value={transaction.transaction_type}
            onChange={(e) => updateField("transaction_type", e.target.value)}
          >
            {TRANSACTION_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label">Destination account type</label>
          <select
            className="field-input"
            value={transaction.destination_account_type}
            onChange={(e) => updateField("destination_account_type", e.target.value)}
          >
            {DEST_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {NUMERIC_FIELDS.map((field) => (
          <div key={field.key}>
            <label className="field-label">
              {field.label}
              <span className="ml-1.5 text-ledger-500">({field.hint})</span>
            </label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              className="field-input"
              value={transaction[field.key]}
              onChange={(e) => updateField(field.key, e.target.value)}
              placeholder="0.00"
              required
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-wire py-3 font-display text-sm font-semibold text-ledger-950 transition-colors hover:bg-wire/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
        {submitting ? "Scoring…" : "Score this transaction"}
      </button>
    </form>
  );
}

export { TRANSACTION_TYPES, DEST_TYPES };
