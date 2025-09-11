import React, { useEffect, useState } from "react";
import { MdWifi, MdWifiOff } from "react-icons/md";
import "./style/NetworkBanner.css";
import { useNetworkStatus, type NetworkStatus } from "./Hook/useNetworkStatus";

type NetworkBannerProps = {
  messages?: Partial<Record<NetworkStatus, string>>;
  icons?: Partial<Record<NetworkStatus, React.ReactNode>>;
  position?: "top" | "bottom";
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
};

const OfflineBanner: React.FC<NetworkBannerProps> = ({
  messages = {
    offline: "No internet connection.",
    good: "You are online!",
  },
  icons = {
    offline: <MdWifiOff size={18} />,
    good: <MdWifi size={18} />,
  },
  position = "top",
  duration = 3000,
  className = "",
  style = {},
}) => {
  const { status, initialized } = useNetworkStatus();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!initialized) return;

    if (status === "offline") {
      setShowBanner(true);
    } else if (status === "good") {
      const timer = setTimeout(() => setShowBanner(false), duration);
      return () => clearTimeout(timer);
    }
  }, [status, initialized, duration]);

  if (!showBanner || !initialized) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`offline-banner ${position} ${status} ${className}`}
      style={style}
    >
      {icons[status]}
      <p>{messages[status]}</p>
    </div>
  );
};

export default OfflineBanner;
