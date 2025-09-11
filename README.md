# 📡 network-banner

[![npm version](https://img.shields.io/npm/v/react-network-banner?color=blue)](https://www.npmjs.com/package/react-network-banner)  
[![npm downloads](https://img.shields.io/npm/dm/react-network-banner.svg?color=brightgreen)](https://www.npmjs.com/package/react-network-banner)  
[![GitHub stars](https://img.shields.io/github/stars/al-waheed/react-network-banner?style=social)](https://github.com/al-waheed/react-network-banner)  
[![License](https://img.shields.io/github/license/al-waheed/react-network-banner)](./LICENSE)


A lightweight React component and hook to monitor network connectivity and display a customizable banner when your app goes offline, has poor connectivity, or comes back online. Fully compatible with React, Next.js (SSR), and other modern frameworks.

---

## 🎥 Demo Preview

![Demo](https://raw.githubusercontent.com/al-waheed/react-network-banner/master/demo/demo-app/demo-banner.gif)

_(GIF shows the banner appearing when offline and hiding when back online.)_

---

## 🚀 Features

- 📶 Detects connectivity: online, offline, and poor network states
- 🧩 Drop-in banner component – <NetworkBanner /> for instant UI feedback
- 🪝 Custom hook – useNetworkStatus() to integrate status in your own components
- 🎛️ Fully customizable – messages, icons, styles, and banner position
- 🌐 Cross-browser support with graceful fallbacks
- ⚡ Next.js SSR compatible – works seamlessly in server-side rendered apps

---

## 📦 Installation

```bash
npm install react-network-banner
# or
yarn add react-network-banner


1. Basic Banner

import { NetworkBanner } from "react-network-banner";

function App() {
  return (
    <div>
      <h1>My App</h1>
      <NetworkBanner />
    </div>
  );
}


2. Custom Messages & Icons

import { NetworkBanner } from "react-network-banner";
import { FiWifiOff, FiWifi } from "react-icons/fi";

function App() {
  return (
    <NetworkBanner
      messages={{
        offline: "❌ No Internet",
        good: "✅ Back online",
      }}
      icons={{
        offline: <FiWifiOff />,
        good: <FiWifi />,
      }}
      position="top"
      duration={4000}
    />
  );
}


3. Using the Hook

import { useNetworkStatus } from "react-network-banner";

function NetworkIndicator() {
  const status = useNetworkStatus(); // "offline" | "good"
  return <p>Current status: {status}</p>;
}


4. Alerts Example

import { useEffect } from "react";
import { useNetworkStatus } from "react-network-banner";

function App() {
  const status = useNetworkStatus();

  useEffect(() => {
    if (status === "offline") alert("⚠️ You are offline!");
    if (status === "good") alert("✅ Back online!");
  }, [status]);

  return <h1>App Content</h1>;
}


⚙️ API Reference
<NetworkBanner /> Props

| Prop        | Type                                                          | Default                                               | Description                                                  |
| ----------- | ------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| `messages`  | `{ offline?: string; good?: string }`          | `{ offline: "You are offline", good: "Back online" }` | Custom text to display for each network state.               |
| `icons`     | `{ offline?: ReactNode; good?: ReactNode }` | `undefined`                                           | Custom icons for each network state (e.g., `<FiWifiOff />`). |
| `position`  | `"top"` \| `"bottom"`                                         | `"bottom"`                                            | Position of the banner on the screen.                        |
| `duration`  | `number`                                                      | `3000`                                                | How long (ms) the banner stays visible when status changes.  |
| `className` | `string`                                                      | `""`                                                  | Additional CSS classes for custom styling.                   |
| `style`     | `React.CSSProperties`                                         | `undefined`                                           | Inline styles for custom theming.                            |


useNetworkStatus() Hook

const status = useNetworkStatus(); // "offline" | "good"
