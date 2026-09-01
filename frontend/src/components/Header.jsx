import { useState } from "react";
import { ShieldHalf, Settings2 } from "lucide-react";
import StatusPill from "./StatusPill.jsx";
import { DEFAULT_API_BASE, getApiBase, setApiBase } from "../lib/api.js";

export default function Header({ healthState, health }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(getApiBase());

  function save() {
    setApiBase(draft || DEFAULT_API_BASE);
    setEditing(false);
    window.location.reload();
  }

  return (
    <header className="sticky top-0 z-30 border-b border-ledger-700/70 bg-ledger-950/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5">
          <ShieldHalf className="h-5 w-5 text-wire" strokeWidth={2.25} />
          <span className="font-display text-[17px] font-semibold tracking-tight">
            FraudShield AI
          </span>
          <span className="hidden font-mono text-xs text-ledger-400 sm:inline">
            transaction risk console
          </span>
        </div>

        <div className="flex items-center gap-2">
          <StatusPill state={healthState} health={health} />
          <div className="relative">
            <button
              onClick={() => setEditing((v) => !v)}
              className="rounded-full border border-ledger-600 bg-ledger-900/70 p-1.5 text-ledger-300 hover:text-wire hover:border-wire/50 transition-colors"
              aria-label="API settings"
            >
              <Settings2 className="h-4 w-4" />
            </button>

            {editing && (
              <div className="panel absolute right-0 top-11 w-72 p-4 text-sm">
                <label className="field-label">Backend API base URL</label>
                <input
                  className="field-input text-xs"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="http://localhost:8000"
                />
                <p className="mt-2 text-xs text-ledger-400">
                  Points at your running <code className="text-ledger-200">fraudshield_api.py</code> instance
                  (<code className="text-ledger-200">uvicorn fraudshield_api:app --reload</code>).
                </p>
                <button
                  onClick={save}
                  className="mt-3 w-full rounded-md bg-wire/90 py-2 text-xs font-medium text-ledger-950 hover:bg-wire transition-colors"
                >
                  Save and reload
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
