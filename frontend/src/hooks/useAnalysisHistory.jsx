import { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "fraudshield_analysis_history";
const MAX_ENTRIES = 200;

const HistoryContext = createContext(null);

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function AnalysisHistoryProvider({ children }) {
  const [entries, setEntries] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // storage full or unavailable — history just won't persist across reloads
    }
  }, [entries]);

  const addEntry = useCallback((transaction, result) => {
    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: new Date().toISOString(),
      transaction,
      result,
    };
    setEntries((prev) => [entry, ...prev].slice(0, MAX_ENTRIES));
    return entry;
  }, []);

  const clearHistory = useCallback(() => setEntries([]), []);

  return (
    <HistoryContext.Provider value={{ entries, addEntry, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useAnalysisHistory() {
  const ctx = useContext(HistoryContext);
  if (!ctx) {
    throw new Error("useAnalysisHistory must be used within AnalysisHistoryProvider");
  }
  return ctx;
}
