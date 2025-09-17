// import { useEffect } from "react";
import { NetworkBanner, useNetworkStatus } from "react-offline-banner";

function App() {
  // const status = useNetworkStatus(); // Hook usage

  //Show alert whenever status changes
  // useEffect(() => {
  //   if (status === "offline") {
  //     alert("⚠️ You are offline!");
  //   } else if (status === "poor") {
  //     alert(" Your network is poor!");
  //   } else if (status === "good") {
  //     alert("✅ Back online!");
  //   }
  // }, [status]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>React Offline Banner Demo</h1>

      {/* Banner usage (optional, still shows banner) */}
      <NetworkBanner
        messages={{
          offline: "You are offline",
          poor: "Your network connection is poor, trying to connect...",
          good: "You are back online",
        }}
        position="top"
        duration={3000}
      />
      <p style={{ marginTop: "2rem", fontSize: "0.9rem", color: "black" }}>
        Network status alerts will pop up automatically using the hook.
      </p>
    </div>
  );
}

export default App;
