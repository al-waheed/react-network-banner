import { useEffect, useState } from "react";

export type NetworkStatus = "unknown" | "good" | "poor" | "offline";

interface NavigatorConnection extends Navigator {
  connection?: {
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
    addEventListener?: (type: "change", listener: () => void) => void;
    removeEventListener?: (type: "change", listener: () => void) => void;
  };
}

const classifyNetwork = (
  connection?: NavigatorConnection["connection"]
): "good" | "poor" => {
  if (!connection) return "good";

  if (connection.saveData) return "poor";
  if (
    connection.effectiveType === "2g" ||
    connection.effectiveType === "slow-2g"
  )
    return "poor";

  if (connection.downlink !== undefined && connection.downlink < 1)
    return "poor";

  if (connection.rtt !== undefined && connection.rtt > 800) return "poor";

  return "good";
};

export function useNetworkStatus(
  checkUrl: string = "https://www.gstatic.com/generate_204",
  timeout: number = 5000
) {
  const [status, setStatus] = useState<NetworkStatus>("unknown");

  useEffect(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return;
    }

    const nav = navigator as NavigatorConnection;

    const checkNetworkStatus = async () => {
      if (!navigator.onLine) {
        setStatus("offline");
        return;
      }

      let quality: "good" | "poor" = classifyNetwork(nav.connection);

      let timeoutId: number | null = null;

      try {
        const controller = new AbortController();
        timeoutId = window.setTimeout(() => controller.abort(), timeout);

        await fetch(checkUrl, {
          mode: "no-cors",
          signal: controller.signal,
          cache: "no-store",
        });
        setStatus(quality);
      } catch {
        setStatus("offline");
      } finally {
        if (timeoutId) clearTimeout(timeoutId);
      }
    };

    checkNetworkStatus();

    window.addEventListener("online", checkNetworkStatus);
    window.addEventListener("offline", checkNetworkStatus);
    nav.connection?.addEventListener?.("change", checkNetworkStatus);

    return () => {
      window.removeEventListener("online", checkNetworkStatus);
      window.removeEventListener("offline", checkNetworkStatus);
      nav.connection?.removeEventListener?.("change", checkNetworkStatus);
    };
  }, [checkUrl, timeout]);

  return status;
}
