import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ScanEye, AlertTriangle } from "lucide-react";
import Gauge from "./Gauge.jsx";

const RISK_STYLES = {
  HIGH: "text-signal-alert border-signal-alert/60 bg-signal-alert/10",
  MEDIUM: "text-signal-watch border-signal-watch/60 bg-signal-watch/10",
  LOW: "text-signal-clear border-signal-clear/60 bg-signal-clear/10",
};

export default function VerdictPanel({ status, result, error, threshold }) {
  return (
    <div className="panel flex h-full flex-col items-center justify-center gap-5 p-6">
      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <Gauge probability={0} threshold={threshold} />
            <div className="flex items-center gap-2 text-sm text-ledger-400">
              <ScanEye className="h-4 w-4" />
              Awaiting a transaction to score
            </div>
          </motion.div>
        )}

        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 text-ledger-300"
          >
            <Loader2 className="h-8 w-8 animate-spin text-wire" />
            <span className="font-mono text-sm">Scoring transaction…</span>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 text-center"
          >
            <AlertTriangle className="h-8 w-8 text-signal-alert" />
            <p className="font-mono text-sm text-signal-alert">Could not score transaction</p>
            <p className="max-w-xs text-xs text-ledger-400">{error}</p>
            <p className="max-w-xs text-xs text-ledger-500">
              Confirm the backend is running and the API base URL (top right) is correct.
            </p>
          </motion.div>
        )}

        {status === "done" && result && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-full flex-col items-center gap-5"
          >
            <Gauge probability={result.fraud_probability} threshold={result.decision_threshold} />

            <motion.div
              initial={{ opacity: 0, y: -6, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: -3 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
              className={`select-none rounded border-2 px-5 py-1.5 font-display text-xl font-bold tracking-wide ${
                result.decision === "FRAUD"
                  ? "border-signal-alert text-signal-alert"
                  : "border-signal-clear text-signal-clear"
              }`}
            >
              {result.decision}
            </motion.div>

            <div className="flex items-center gap-3 text-xs">
              <span
                className={`rounded-full border px-2.5 py-1 font-mono ${
                  RISK_STYLES[result.risk_level] || RISK_STYLES.LOW
                }`}
              >
                {result.risk_level} RISK
              </span>
              <span className="font-mono text-ledger-400">
                threshold {result.decision_threshold.toFixed(2)}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
