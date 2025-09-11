import { useEffect, useState } from "react";

export type NetworkStatus = "offline" | "good";

export function useNetworkStatus() {
  const [status, setStatus] = useState<NetworkStatus>("offline");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return;
    }

    const checkNetworkStatus = async () => {
      if (!navigator.onLine) {
        setStatus("offline");
        setInitialized(true);
        return;
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        await fetch("https://www.gstatic.com/generate_204", {
          mode: "no-cors",
          signal: controller.signal,
          cache: "no-store",
        } as RequestInit);
        clearTimeout(timeoutId);
        setStatus("good");
      } catch {
        setStatus("offline");
      } finally {
        setInitialized(true);
      }
    };

    checkNetworkStatus();
    window.addEventListener("online", checkNetworkStatus);
    window.addEventListener("offline", checkNetworkStatus);

    return () => {
      window.removeEventListener("online", checkNetworkStatus);
      window.removeEventListener("offline", checkNetworkStatus);
    };
  }, []);

  return { status, initialized };
}
