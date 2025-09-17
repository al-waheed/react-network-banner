import React, { useEffect, useState, useRef } from "react";
import { MdWifi, MdWifiOff, MdNetworkWifi3Bar } from "react-icons/md";
import "./style/NetworkBanner.css";
import { useNetworkStatus, type NetworkStatus } from "./Hook/useNetworkStatus";

type BannerState = Exclude<NetworkStatus, "unknown">;

type NetworkBannerProps = {
  messages?: Partial<Record<BannerState, string>>;
  icons?: Partial<Record<BannerState, React.ReactNode>>;
  position?: "top" | "bottom";
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  checkUrl?: string;
  timeout?: number;
};

const NetworkBanner: React.FC<NetworkBannerProps> = ({
  checkUrl = "https://www.gstatic.com/generate_204",
  timeout = 5000,
  messages = {
    offline: "No internet connection.",
    poor: "Your connection is unstable.",
    good: "You are online!",
  },
  icons = {
    offline: <MdWifiOff size={18} />,
    poor: <MdNetworkWifi3Bar size={18} />,
    good: <MdWifi size={18} />,
  },
  position = "top",
  duration = 3000,
  className = "",
  style = {},
}) => {
  const timerRef = useRef<number | null>(null);
  const status = useNetworkStatus(checkUrl, timeout);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (status === "unknown") return;

    if (status === "offline" || status === "poor") {
      if (timerRef.current) clearTimeout(timerRef.current);
      setShowBanner(true);
    } else if (status === "good") {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setShowBanner(false), duration);
    }
  }, [status, duration]);

  if (status === "unknown" || !showBanner) return null;
  console.log("Rendering banner with status:", status);

  return (
    <div
      role={status === "offline" ? "alert" : "status"}
      aria-live={status === "offline" ? "assertive" : "polite"}
      className={`network-banner ${position} ${status} ${className}`}
      style={style}
    >
      {icons[status]}
      <p>{messages[status]}</p>
    </div>
  );
};

export default NetworkBanner;
