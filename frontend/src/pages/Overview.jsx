import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import MetricGrid from "../components/MetricGrid.jsx";
import ConfusionGrid from "../components/ConfusionGrid.jsx";
import TypeRiskChart from "../components/TypeRiskChart.jsx";
import StatusPill from "../components/StatusPill.jsx";
import { MODEL_METADATA as M } from "../lib/modelMetadata.js";

export default function Overview({ healthState, health }) {
  return (
    <div className="flex flex-col gap-5">
      <section>
        <h1 className="font-display text-2xl font-semibold text-ledger-100 sm:text-3xl">
          Fraud monitoring overview
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ledger-400">
          Final held-out test performance for the production FraudShield model, plus the
          live status of your running API.
        </p>
      </section>

      {/* Current model + API status */}
      <section className="panel flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-wire" />
          <div>
            <div className="font-display text-base font-semibold text-ledger-100">
              {health?.model || M.model}
            </div>
            <div className="font-mono text-xs text-ledger-400">
              decision threshold {(health?.decision_threshold ?? M.decisionThreshold).toFixed(2)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusPill state={healthState} health={health} />
          <Link
            to="/analyze"
            className="flex items-center gap-1.5 rounded-md bg-wire px-3.5 py-2 text-xs font-semibold text-ledger-950 hover:bg-wire/90 transition-colors"
          >
            Analyze a transaction
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Headline metrics */}
      <section className="panel p-6">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-base font-semibold text-ledger-100">
            Final test scorecard
          </h2>
          <span className="font-mono text-[11px] text-ledger-500">
            {M.testSamples.toLocaleString()} held-out transactions · {M.testFraudTransactions} fraud
          </span>
        </div>
        <MetricGrid />

        <div className="mt-5">
          <ConfusionGrid />
        </div>

        <p className="mt-4 text-[12px] leading-relaxed text-ledger-400">
          The model captured{" "}
          <span className="text-ledger-200">
            {(M.fraudAmountCaptureRate * 100).toFixed(2)}%
          </span>{" "}
          of fraudulent transaction value on the test set, missing one transaction with a
          zero origin balance — see Model Insights for the documented pattern.
        </p>
      </section>

      <TypeRiskChart />
    </div>
  );
}
