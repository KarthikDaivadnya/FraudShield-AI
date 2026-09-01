import { motion } from "framer-motion";

const CX = 150;
const CY = 140;
const R = 118;

// Map a probability in [0,1] to an angle in degrees, -90 (left, 0.0) to
// +90 (right, 1.0), sweeping across the top semicircle.
function angleFor(p) {
  return -90 + p * 180;
}

function polar(angleDeg, radius = R) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CX + radius * Math.cos(a),
    y: CY + radius * Math.sin(a),
  };
}

function arcPath(startP, endP, radius = R) {
  const start = polar(angleFor(startP), radius);
  const end = polar(angleFor(endP), radius);
  const largeArc = endP - startP > 0.5 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

export default function Gauge({ probability = 0, threshold = 0.21, size = 300 }) {
  const p = Math.min(1, Math.max(0, probability));
  const needleAngle = angleFor(p);

  const zones = [
    { from: 0, to: threshold, color: "#2FD8AA" },
    { from: threshold, to: 0.75, color: "#F0AE3C" },
    { from: 0.75, to: 1, color: "#F2542D" },
  ];

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 300 168"
        width={size}
        height={(size * 168) / 300}
        role="img"
        aria-label={`Fraud probability gauge at ${(p * 100).toFixed(1)} percent`}
      >
        <path
          d={arcPath(0, 1, R + 14)}
          fill="none"
          stroke="#1A2438"
          strokeWidth="1"
        />

        {zones.map((z) => (
          <path
            key={z.color}
            d={arcPath(z.from, z.to)}
            fill="none"
            stroke={z.color}
            strokeWidth="14"
            strokeLinecap="butt"
            opacity="0.9"
          />
        ))}

        {/* threshold tick */}
        <line
          x1={polar(angleFor(threshold), R - 10).x}
          y1={polar(angleFor(threshold), R - 10).y}
          x2={polar(angleFor(threshold), R + 16).x}
          y2={polar(angleFor(threshold), R + 16).y}
          stroke="#E7ECF5"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* needle */}
        <motion.g
          initial={false}
          animate={{ rotate: needleAngle }}
          transition={{ type: "spring", stiffness: 90, damping: 14 }}
          style={{ originX: `${CX}px`, originY: `${CY}px` }}
        >
          <line
            x1={CX}
            y1={CY}
            x2={CX}
            y2={CY - R + 22}
            stroke="#E7ECF5"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </motion.g>
        <circle cx={CX} cy={CY} r="6" fill="#E7ECF5" />

        <text
          x={CX}
          y={CY - 34}
          textAnchor="middle"
          className="fill-ledger-100 font-mono"
          fontSize="30"
          fontWeight="600"
        >
          {(p * 100).toFixed(1)}%
        </text>
        <text
          x={CX}
          y={CY - 12}
          textAnchor="middle"
          className="fill-ledger-400"
          fontSize="11"
        >
          fraud probability
        </text>
      </svg>

      <div className="flex w-full justify-between px-3 font-mono text-[11px] text-ledger-400">
        <span>0.0</span>
        <span className="text-ledger-300">threshold {threshold.toFixed(2)}</span>
        <span>1.0</span>
      </div>
    </div>
  );
}
