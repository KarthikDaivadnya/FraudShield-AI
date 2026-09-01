import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { SHAP_FEATURE_IMPORTANCE, SHAP_INTERPRETATIONS } from "../lib/modelInsights.js";

const data = [...SHAP_FEATURE_IMPORTANCE].reverse(); // largest at top when rendered vertically

function barColor(feature) {
  return SHAP_INTERPRETATIONS[feature] ? "#5EA1FF" : "#324361";
}

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="max-w-xs rounded-md border border-ledger-600 bg-ledger-900 px-3 py-2 text-xs">
      <div className="font-mono text-ledger-100">{d.feature}</div>
      <div className="text-ledger-400">mean |SHAP| {d.meanAbsShap.toFixed(4)}</div>
      {SHAP_INTERPRETATIONS[d.feature] && (
        <div className="mt-1 text-ledger-300">{SHAP_INTERPRETATIONS[d.feature]}</div>
      )}
    </div>
  );
}

export default function ShapImportanceChart() {
  return (
    <div style={{ width: "100%", height: 420 }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ left: 12, right: 20, top: 4, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1A2438" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: "#8593AC", fontSize: 11, fontFamily: "JetBrains Mono" }}
            axisLine={{ stroke: "#233149" }}
            tickLine={false}
          />
          <YAxis
            dataKey="feature"
            type="category"
            width={190}
            tick={{ fill: "#B7C1D6", fontSize: 11, fontFamily: "JetBrains Mono" }}
            axisLine={{ stroke: "#233149" }}
            tickLine={false}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar dataKey="meanAbsShap" radius={[0, 4, 4, 0]}>
            {data.map((d) => (
              <Cell key={d.feature} fill={barColor(d.feature)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
