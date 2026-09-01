import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { FRAUD_RATE_BY_TYPE, DATASET_SUMMARY } from "../lib/modelMetadata.js";

const COLORS = {
  TRANSFER: "#F2542D",
  CASH_OUT: "#F0AE3C",
  CASH_IN: "#2FD8AA",
  PAYMENT: "#2FD8AA",
  DEBIT: "#2FD8AA",
};

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-md border border-ledger-600 bg-ledger-900 px-3 py-2 text-xs">
      <div className="font-mono text-ledger-100">{d.type}</div>
      <div className="text-ledger-400">
        {d.fraud.toLocaleString()} fraud / {d.count.toLocaleString()} transactions
      </div>
      <div className="text-ledger-200">{d.ratePct}% fraud rate</div>
    </div>
  );
}

export default function TypeRiskChart() {
  return (
    <div className="panel p-6">
      <div className="mb-1 flex items-baseline justify-between">
        <h2 className="font-display text-base font-semibold text-ledger-100">
          Fraud rate by transaction type
        </h2>
        <span className="font-mono text-[11px] text-ledger-500">
          {DATASET_SUMMARY.rows.toLocaleString()} transactions · {DATASET_SUMMARY.fraudRatePct}% fraud overall
        </span>
      </div>
      <p className="mb-4 text-[12px] text-ledger-400">
        Fraud in this dataset only ever appears in TRANSFER and CASH_OUT transactions.
      </p>

      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <BarChart data={FRAUD_RATE_BY_TYPE} margin={{ left: -12, right: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1A2438" vertical={false} />
            <XAxis
              dataKey="type"
              tick={{ fill: "#8593AC", fontSize: 11, fontFamily: "JetBrains Mono" }}
              axisLine={{ stroke: "#233149" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#8593AC", fontSize: 11, fontFamily: "JetBrains Mono" }}
              axisLine={{ stroke: "#233149" }}
              tickLine={false}
              unit="%"
              width={40}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Bar dataKey="ratePct" radius={[4, 4, 0, 0]}>
              {FRAUD_RATE_BY_TYPE.map((d) => (
                <Cell key={d.type} fill={COLORS[d.type]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
