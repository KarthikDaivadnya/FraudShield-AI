import { NavLink } from "react-router-dom";
import { LayoutDashboard, ScanSearch, Table2, BrainCircuit, Server } from "lucide-react";

const PAGES = [
  { to: "/", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/analyze", label: "Transaction Analyzer", icon: ScanSearch },
  { to: "/investigation", label: "Fraud Investigation", icon: Table2 },
  { to: "/insights", label: "Model Insights", icon: BrainCircuit },
  { to: "/system", label: "System & Model", icon: Server },
];

export default function NavTabs() {
  return (
    <nav className="sticky top-[65px] z-20 border-b border-ledger-700/70 bg-ledger-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4">
        {PAGES.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-[13px] transition-colors ${
                isActive
                  ? "border-wire text-ledger-100"
                  : "border-transparent text-ledger-400 hover:text-ledger-200"
              }`
            }
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
