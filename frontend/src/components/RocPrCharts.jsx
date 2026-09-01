import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { ROC_CURVE, PR_CURVE } from "../lib/modelInsights.js";
import { MODEL_METADATA as M } from "../lib/modelMetadata.js";

const axisTick = { fill: "#8593AC", fontSize: 11, fontFamily: "JetBrains Mono" };
const axisLine = { stroke: "#233149" };

export default function RocPrCharts() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <h3 className="font-display text-sm font-semibold text-ledger-100">ROC curve</h3>
          <span className="font-mono text-[11px] text-ledger-500">
            AUC {(M.rocAuc * 100).toFixed(2)}%
          </span>
        </div>
        <div style={{ width: "100%", height: 240 }}>
          <ResponsiveContainer>
            <LineChart data={ROC_CURVE} margin={{ left: -16, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A2438" />
              <XAxis
                dataKey="fpr"
                type="number"
                domain={[0, 1]}
                tick={axisTick}
                axisLine={axisLine}
                tickLine={false}
                label={{ value: "False positive rate", position: "insideBottom", offset: -4, fill: "#5A6E8F", fontSize: 10 }}
              />
              <YAxis domain={[0, 1]} tick={axisTick} axisLine={axisLine} tickLine={false} width={36} />
              <Tooltip
                contentStyle={{ background: "#101828", border: "1px solid #233149", fontSize: 11 }}
                labelFormatter={(v) => `FPR ${v}`}
              />
              <ReferenceLine
                segment={[{ x: 0, y: 0 }, { x: 1, y: 1 }]}
                stroke="#324361"
                strokeDasharray="4 4"
              />
              <Line type="monotone" dataKey="tpr" stroke="#2FD8AA" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <h3 className="font-display text-sm font-semibold text-ledger-100">
            Precision-Recall curve
          </h3>
          <span className="font-mono text-[11px] text-ledger-500">
            AUC {(M.prAuc * 100).toFixed(2)}%
          </span>
        </div>
        <div style={{ width: "100%", height: 240 }}>
          <ResponsiveContainer>
            <LineChart data={PR_CURVE} margin={{ left: -16, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A2438" />
              <XAxis
                dataKey="recall"
                type="number"
                domain={[0, 1]}
                tick={axisTick}
                axisLine={axisLine}
                tickLine={false}
                label={{ value: "Recall", position: "insideBottom", offset: -4, fill: "#5A6E8F", fontSize: 10 }}
              />
              <YAxis domain={[0, 1]} tick={axisTick} axisLine={axisLine} tickLine={false} width={36} />
              <Tooltip
                contentStyle={{ background: "#101828", border: "1px solid #233149", fontSize: 11 }}
                labelFormatter={(v) => `Recall ${v}`}
              />
              <Line type="monotone" dataKey="precision" stroke="#5EA1FF" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
