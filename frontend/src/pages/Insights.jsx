import MetricGrid from "../components/MetricGrid.jsx";
import ConfusionGrid from "../components/ConfusionGrid.jsx";
import ShapImportanceChart from "../components/ShapImportanceChart.jsx";
import RocPrCharts from "../components/RocPrCharts.jsx";
import { SHAP_FEATURE_IMPORTANCE, SHAP_INTERPRETATIONS, THRESHOLD_EXPLAINER } from "../lib/modelInsights.js";

const TOP_SHAP = SHAP_FEATURE_IMPORTANCE.slice(0, 6);

export default function Insights() {
  return (
    <div className="flex flex-col gap-5">
      <section>
        <h1 className="font-display text-2xl font-semibold text-ledger-100 sm:text-3xl">
          Model Insights
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ledger-400">
          Why the model decides what it decides — SHAP feature attribution, ranked
          performance curves, and the reasoning behind the 0.21 decision threshold.
        </p>
      </section>

      <section className="panel p-6">
        <div className="mb-1 flex items-baseline justify-between">
          <h2 className="font-display text-base font-semibold text-ledger-100">
            SHAP feature importance
          </h2>
          <span className="font-mono text-[11px] text-ledger-500">
            mean |SHAP|, fraud class, validation set (n=1,671)
          </span>
        </div>
        <p className="mb-4 text-[12px] text-ledger-400">
          Bars in blue are the six strongest features, with a directional read below.
        </p>
        <ShapImportanceChart />

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {TOP_SHAP.map((f, i) => (
            <div key={f.feature} className="rounded-md border border-ledger-600 bg-ledger-900/40 p-3">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[13px] text-ledger-100">
                  #{i + 1} {f.feature}
                </span>
                <span className="font-mono text-[11px] text-ledger-500">
                  {f.meanAbsShap.toFixed(4)}
                </span>
              </div>
              <p className="mt-1 text-[12px] text-ledger-400">{SHAP_INTERPRETATIONS[f.feature]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel p-6">
        <h2 className="mb-4 font-display text-base font-semibold text-ledger-100">
          ROC and Precision-Recall
        </h2>
        <RocPrCharts />
        <p className="mt-4 text-[12px] leading-relaxed text-ledger-400">
          Curves are reproduced by re-running the saved production pipeline against the
          exact 1,672-row held-out test split from the notebook (same stratified 70/15/15
          split, <code className="text-ledger-300">random_state=42</code>) — not
          interpolated or estimated.
        </p>
      </section>

      <section className="panel p-6">
        <h2 className="mb-4 font-display text-base font-semibold text-ledger-100">
          Test-set metrics and confusion matrix
        </h2>
        <MetricGrid />
        <div className="mt-5">
          <ConfusionGrid />
        </div>
      </section>

      <section className="panel p-6">
        <h2 className="mb-3 font-display text-base font-semibold text-ledger-100">
          Why 0.21, not the default 0.50?
        </h2>
        <p className="text-[13px] leading-relaxed text-ledger-300">{THRESHOLD_EXPLAINER.note}</p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <Stat label="Validation precision" value={THRESHOLD_EXPLAINER.validationPrecision} />
          <Stat label="Validation recall" value={THRESHOLD_EXPLAINER.validationRecall} />
          <Stat label="Validation F1" value={THRESHOLD_EXPLAINER.validationF1} />
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-md border border-ledger-600 bg-ledger-900/40 p-3">
      <div className="font-mono text-lg font-semibold tabular text-ledger-100">
        {(value * 100).toFixed(2)}%
      </div>
      <div className="mt-1 text-[11px] text-ledger-400">{label}</div>
    </div>
  );
}
