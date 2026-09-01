import { engineerSignals } from "../lib/features.js";

const ROWS = [
  {
    key: "originBalanceChange",
    label: "origin balance change",
    format: (v) => v.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    note: "oldbalanceOrg − newbalanceOrig. Fraud cases track amount almost exactly.",
  },
  {
    key: "originBalanceMatch",
    label: "balance change matches amount",
    format: (v) => (v ? "yes" : "no"),
    note: "Present in 97.3% of fraud vs. 40.2% of legitimate transactions.",
    boolFlag: true,
  },
  {
    key: "originBalanceFullyDepleted",
    label: "origin fully depleted",
    format: (v) => (v ? "yes" : "no"),
    note: "The strongest single SHAP signal in the trained model.",
    boolFlag: true,
  },
  {
    key: "originBalanceZero",
    label: "origin balance started at zero",
    format: (v) => (v ? "yes" : "no"),
    note: "Common in the model's known false-negative pattern.",
    boolFlag: true,
  },
];

export default function SignalBreakdown({ transaction }) {
  const amount = Number(transaction.amount);
  const oldOrg = Number(transaction.oldbalanceOrg);
  const newOrg = Number(transaction.newbalanceOrig);

  const ready =
    transaction.amount !== "" &&
    transaction.oldbalanceOrg !== "" &&
    transaction.newbalanceOrig !== "" &&
    !Number.isNaN(amount) &&
    !Number.isNaN(oldOrg) &&
    !Number.isNaN(newOrg);

  const signals = ready
    ? engineerSignals({ amount, oldbalanceOrg: oldOrg, newbalanceOrig: newOrg })
    : null;

  return (
    <div className="panel p-4">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="font-display text-sm font-semibold text-ledger-100">
          Origin-side signals
        </h3>
        <span className="font-mono text-[11px] text-ledger-500">live</span>
      </div>

      {!ready ? (
        <p className="text-xs text-ledger-500">
          Fill in amount, opening and closing origin balance to see the engineered
          signals the model reads.
        </p>
      ) : (
        <dl className="space-y-2.5">
          {ROWS.map((row) => {
            const value = signals[row.key];
            const flagged = row.boolFlag && value === 1;
            return (
              <div key={row.key} className="flex items-start justify-between gap-4">
                <div>
                  <dt className="text-[13px] text-ledger-300">{row.label}</dt>
                  <dd className="text-[11px] text-ledger-500">{row.note}</dd>
                </div>
                <dd
                  className={`shrink-0 font-mono text-sm tabular ${
                    flagged ? "text-signal-watch" : "text-ledger-200"
                  }`}
                >
                  {row.format(value)}
                </dd>
              </div>
            );
          })}
        </dl>
      )}
    </div>
  );
}
