export default function StatusPill({ state, health }) {
  const dot =
    state === "online"
      ? "bg-signal-clear shadow-[0_0_8px_theme(colors.signal.clear)]"
      : state === "offline"
      ? "bg-signal-alert shadow-[0_0_8px_theme(colors.signal.alert)]"
      : "bg-ledger-400";

  const label =
    state === "online"
      ? health?.model
        ? `API online — ${health.model}`
        : "API online"
      : state === "offline"
      ? "API unreachable"
      : "Checking API…";

  return (
    <div className="flex items-center gap-2 rounded-full border border-ledger-600 bg-ledger-900/70 px-3 py-1.5 text-xs text-ledger-300">
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      <span className="font-mono">{label}</span>
    </div>
  );
}
