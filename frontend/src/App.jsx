import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import NavTabs from "./components/NavTabs.jsx";
import Footer from "./components/Footer.jsx";
import Overview from "./pages/Overview.jsx";
import Analyzer from "./pages/Analyzer.jsx";
import Investigation from "./pages/Investigation.jsx";
import Insights from "./pages/Insights.jsx";
import System from "./pages/System.jsx";
import { useHealth } from "./hooks/useHealth.js";
import { AnalysisHistoryProvider } from "./hooks/useAnalysisHistory.jsx";

export default function App() {
  const { state: healthState, health } = useHealth();

  return (
    <AnalysisHistoryProvider>
      <HashRouter>
        <div className="min-h-screen bg-grid bg-fixed">
          <Header healthState={healthState} health={health} />
          <NavTabs />

          <main className="mx-auto max-w-6xl px-6 py-8">
            <Routes>
              <Route path="/" element={<Overview healthState={healthState} health={health} />} />
              <Route path="/analyze" element={<Analyzer />} />
              <Route path="/investigation" element={<Investigation />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/system" element={<System healthState={healthState} health={health} />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </HashRouter>
    </AnalysisHistoryProvider>
  );
}
