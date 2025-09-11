# 📡 react-network-banner

[![npm version](https://img.shields.io/npm/v/react-network-banner?color=blue)](https://www.npmjs.com/package/react-network-banner)  
[![npm downloads](https://img.shields.io/npm/dm/react-network-banner.svg?color=brightgreen)](https://www.npmjs.com/package/react-network-banner)  
[![GitHub stars](https://img.shields.io/github/stars/al-waheed/react-network-banner?style=social)](https://github.com/al-waheed/react-network-banner)  
[![License](https://img.shields.io/github/license/al-waheed/react-network-banner)](./LICENSE)


A lightweight React component and hook to monitor **network connectivity** and display a **banner** when your app goes offline, has poor connectivity, or comes back online.

---

## 🎥 Demo Preview

![Demo](https://raw.githubusercontent.com/al-waheed/react-network-banner/master/demo/demo-app/demo-banner.gif)

_(GIF shows the banner appearing when offline and hiding when back online.)_

---

## 🚀 Features

- 📶 Detects **online / offline / poor** connections
- 🧩 Drop-in **banner component** (`<NetworkBanner />`)
- 🪝 Custom **hook** (`useNetworkStatus()`)
- 🎛️ Fully customizable: messages, icons, styles, position
- 🌐 Works in all modern browsers with fallbacks

---

## 📦 Installation

```bash
npm install react-network-banner
# or
yarn add react-network-banner

🖼️ Usage

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
        poor: "⚠️ Weak connection",
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
  const status = useNetworkStatus(); // "offline" | "poor" | "good"

  return <p>Current status: {status}</p>;
}

4. Alerts Example

import { useEffect } from "react";
import { useNetworkStatus } from "react-network-banner";

function App() {
  const status = useNetworkStatus();

  useEffect(() => {
    if (status === "offline") alert("⚠️ You are offline!");
    if (status === "poor") alert("⚠️ Weak network");
    if (status === "good") alert("✅ Back online!");
  }, [status]);

  return <h1>App Content</h1>;
}

---

## ⚙️ API Reference

### `<NetworkBanner />` Props

| Prop       | Type                           | Default             | Description                                                                 |
|------------|--------------------------------|---------------------|-----------------------------------------------------------------------------|
| `messages` | `{ offline?: string; poor?: string; good?: string }` | `{ offline: "You are offline", good: "Back online" }` | Custom text to display for each network state. |
| `icons`    | `{ offline?: ReactNode; poor?: ReactNode; good?: ReactNode }` | `undefined` | Custom icons for each network state (e.g., `<FiWifiOff />`). |
| `position` | `"top"` \| `"bottom"`          | `"bottom"`          | Position of the banner on the screen.                                       |
| `duration` | `number`                       | `3000`              | How long (ms) the banner stays visible when status changes.                 |
| `className`| `string`                       | `""`                | Additional CSS classes for custom styling.                                  |
| `style`    | `React.CSSProperties`          | `undefined`         | Inline styles for custom theming.                                           |

---

### `useNetworkStatus()` Hook

```ts
const status = useNetworkStatus();


## 📜 License

MIT License © 2025 [Morenikeji Ajisegiri](https://github.com/al-waheed)  
See the [LICENSE](./LICENSE) file for details.