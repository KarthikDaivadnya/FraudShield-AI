import { useEffect, useState, useCallback } from "react";
import { fetchHealth, getApiBase } from "../lib/api.js";

export function useHealth(pollMs = 15000) {
  const [state, setState] = useState("checking"); // checking | online | offline
  const [health, setHealth] = useState(null);

  const check = useCallback(async () => {
    setState((prev) => (prev === "online" ? prev : "checking"));
    try {
      const res = await fetchHealth();
      setHealth(res);
      setState("online");
    } catch {
      setHealth(null);
      setState("offline");
    }
  }, []);

  useEffect(() => {
    check();
    const interval = setInterval(check, pollMs);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getApiBase(), pollMs]);

  return { state, health, refresh: check };
}
