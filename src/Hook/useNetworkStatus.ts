import { useEffect, useState } from "react";

export type NetworkStatus = "offline" | "good" | "unknown";

export function useNetworkStatus(
  checkUrl: string = "https://www.gstatic.com/generate_204",
  timeout: number = 5000
) {
  const [status, setStatus] = useState<NetworkStatus>("unknown");

  useEffect(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return;
    }

    const checkNetworkStatus = async () => {
      if (!navigator.onLine) {
        setStatus("offline");
        return;
      }

      let timeoutId: number | null = null;
      try {
        const controller = new AbortController();
        timeoutId = setTimeout(() => controller.abort(), timeout);
        await fetch(checkUrl, {
          mode: "no-cors",
          signal: controller.signal,
          cache: "no-store",
        });
        setStatus("good");
      } catch {
        setStatus("offline");
      } finally {
        if (timeoutId) clearTimeout(timeoutId);
      }
    };

    checkNetworkStatus();
    window.addEventListener("online", checkNetworkStatus);
    window.addEventListener("offline", checkNetworkStatus);

    return () => {
      window.removeEventListener("online", checkNetworkStatus);
      window.removeEventListener("offline", checkNetworkStatus);
    };
  }, [checkUrl, timeout]);

  return status;
}
