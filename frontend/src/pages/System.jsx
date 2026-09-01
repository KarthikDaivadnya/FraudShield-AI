import { useEffect, useState } from "react";
import { Cpu, Database, GitBranch, Radio } from "lucide-react";
import StatusPill from "../components/StatusPill.jsx";
import { fetchRoot } from "../lib/api.js";
import {
  MODEL_CONFIG as C,
  ENCODED_FEATURE_NAMES,
  SPLIT_SUMMARY,
  DATASET_SUMMARY,
  MODEL_METADATA as M,
} from "../lib/modelMetadata.js";

export default function System({ healthState, health }) {
  const [root, setRoot] = useState(null);

  useEffect(() => {
    fetchRoot()
      .then(setRoot)
      .catch(() => setRoot(null));
  }, [healthState]);

  return (
    <div className="flex flex-col gap-5">
      <section>
        <h1 className="font-display text-2xl font-semibold text-ledger-100 sm:text-3xl">
          System &amp; Model
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ledger-400">
          Production configuration of the deployed classifier and the live status of the
          FastAPI service behind it.
        </p>
      </section>

      {/* API health */}
      <section className="panel p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Radio className="h-4 w-4 text-wire" />
            <h2 className="font-display text-base font-semibold text-ledger-100">
              API health
            </h2>
          </div>
          <StatusPill state={healthState} health={health} />
        </div>

        {healthState === "online" ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <InfoBox label="Status" value={health?.status || "healthy"} />
            <InfoBox label="Serving model" value={health?.model || M.model} />
            <InfoBox
              label="Decision threshold"
              value={(health?.decision_threshold ?? M.decisionThreshold).toFixed(2)}
            />
            <InfoBox label="App version" value={root?.version || "—"} />
          </div>
        ) : (
          <p className="text-sm text-ledger-500">
            Backend unreachable — start it with{" "}
            <code className="text-ledger-300">uvicorn fraudshield_api:app --reload</code> and
            confirm CORS is enabled (see README).
          </p>
        )}

        {root?.endpoints && (
          <div className="mt-4 flex flex-wrap gap-2">
            {Object.entries(root.endpoints).map(([name, path]) => (
              <span
                key={name}
                className="rounded-md border border-ledger-600 bg-ledger-900/50 px-2.5 py-1 font-mono text-[11px] text-ledger-300"
              >
                {name}: {path}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Model configuration */}
      <section className="panel p-6">
        <div className="mb-4 flex items-center gap-2.5">
          <Cpu className="h-4 w-4 text-wire" />
          <h2 className="font-display text-base font-semibold text-ledger-100">
            Model configuration
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <InfoBox label="Algorithm" value="Random Forest" />
          <InfoBox label="Estimators" value={C.nEstimators} />
          <InfoBox label="Min samples/leaf" value={C.minSamplesLeaf} />
          <InfoBox label="Class weight" value={C.classWeight} />
          <InfoBox label="Random state" value={C.randomState} />
          <InfoBox label="Decision threshold" value={M.decisionThreshold.toFixed(2)} />
        </div>
      </section>

      {/* Features */}
      <section className="panel p-6">
        <div className="mb-4 flex items-center gap-2.5">
          <GitBranch className="h-4 w-4 text-wire" />
          <h2 className="font-display text-base font-semibold text-ledger-100">
            Feature pipeline
          </h2>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <InfoBox label="Candidate features" value={C.candidateFeatures} />
          <InfoBox label="Numerical" value={C.numericalFeatures} />
          <InfoBox label="Categorical" value={C.categoricalFeatures} />
          <InfoBox label="Encoded (model input)" value={C.encodedFeatures} />
        </div>
        <p className="mb-2 text-[12px] text-ledger-400">{C.preprocessing}</p>
        <div className="flex flex-wrap gap-1.5">
          {ENCODED_FEATURE_NAMES.map((f) => (
            <span
              key={f}
              className="rounded border border-ledger-600 bg-ledger-900/40 px-2 py-1 font-mono text-[11px] text-ledger-300"
            >
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* Training / test information */}
      <section className="panel p-6">
        <div className="mb-4 flex items-center gap-2.5">
          <Database className="h-4 w-4 text-wire" />
          <h2 className="font-display text-base font-semibold text-ledger-100">
            Training &amp; test data
          </h2>
        </div>
        <p className="mb-4 text-[12px] text-ledger-400">
          {DATASET_SUMMARY.rows.toLocaleString()} total transactions,{" "}
          {DATASET_SUMMARY.fraudRatePct}% fraud, split 70/15/15 (stratified,{" "}
          <code className="text-ledger-300">random_state=42</code>).
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-ledger-600 text-[11px] uppercase tracking-wide text-ledger-500">
                <th className="px-3 py-2 font-normal">Split</th>
                <th className="px-3 py-2 font-normal">Samples</th>
                <th className="px-3 py-2 font-normal">Fraud</th>
                <th className="px-3 py-2 font-normal">Fraud rate</th>
              </tr>
            </thead>
            <tbody>
              {SPLIT_SUMMARY.map((s) => (
                <tr key={s.name} className="border-b border-ledger-700/60">
                  <td className="px-3 py-2 font-mono text-ledger-200">{s.name}</td>
                  <td className="px-3 py-2 font-mono tabular text-ledger-100">
                    {s.samples.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 font-mono tabular text-ledger-100">{s.fraud}</td>
                  <td className="px-3 py-2 font-mono tabular text-ledger-100">
                    {s.fraudRatePct}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Deployment */}
      <section className="panel p-6">
        <h2 className="mb-4 font-display text-base font-semibold text-ledger-100">
          Deployment
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <div className="field-label">Backend</div>
            <pre className="rounded-md border border-ledger-600 bg-ledger-900 p-3 font-mono text-[12px] text-ledger-200">
{`uvicorn fraudshield_api:app --reload`}
            </pre>
            <p className="mt-2 text-[11px] text-ledger-500">
              Requires {C.pipelineFile} and decision_threshold.joblib under
              fraudshield_production/.
            </p>
          </div>
          <div>
            <div className="field-label">Frontend</div>
            <pre className="rounded-md border border-ledger-600 bg-ledger-900 p-3 font-mono text-[12px] text-ledger-200">
{`npm install
npm run dev`}
            </pre>
            <p className="mt-2 text-[11px] text-ledger-500">
              API base URL is configurable from the gear icon in the header.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="rounded-md border border-ledger-600 bg-ledger-900/40 p-3">
      <div className="font-mono text-sm font-semibold text-ledger-100 truncate" title={String(value)}>
        {value}
      </div>
      <div className="mt-1 text-[11px] text-ledger-400">{label}</div>
    </div>
  );
}
