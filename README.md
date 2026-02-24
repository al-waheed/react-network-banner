# 📡 network-banner

[![npm version](https://img.shields.io/npm/v/react-network-banner?color=blue)](https://www.npmjs.com/package/react-network-banner)
![npm total downloads](https://img.shields.io/npm/dt/react-network-banner?color=blue)
[![npm downloads](https://img.shields.io/npm/dm/react-network-banner.svg?color=brightgreen)](https://www.npmjs.com/package/react-network-banner)
[![GitHub stars](https://img.shields.io/github/stars/al-waheed/react-network-banner?style=social)](https://github.com/al-waheed/react-network-banner)
[![License](https://img.shields.io/npm/l/react-network-banner?color=blue)](https://github.com/al-waheed/react-network-banner/blob/master/LICENSE)


A lightweight React component and hook to monitor network connectivity and display a customizable banner when your app goes offline, has poor connection, or comes back online. Fully compatible with React, Next.js (SSR), and other modern frameworks.

---

## 🎥 Demo Preview

![Demo](https://raw.githubusercontent.com/al-waheed/react-network-banner/master/demo-app/demo-banner.gif)

_(GIF shows the banner appearing when offline/poor and hiding when back online.)_

---

## 🚀 Features

- 📶 Detects online / offline / poor connection
- 🧩 Drop-in banner component (<NetworkBanner />)
- 🪝 Custom hook (useNetworkStatus())
- 🎛️ Fully customizable: messages, icons, styles, position
- 🌐 Works in all modern browsers with fallbacks
- ⚡ Next.js SSR compatible – works seamlessly in server-side rendered apps
- 🔧 Supports custom check URL & timeout (use your own /health endpoint instead of Google’s default)

---

## 📦 Installation

```bash
npm install react-network-banner
# or
yarn add react-network-banner

```

## Basic Banner

```bash
import { NetworkBanner } from "react-network-banner";

function App() {
  return (
    <div>
      <h1>My App</h1>
      <NetworkBanner />
    </div>
  );
}
```

## Using the Hook

```bash

By default it uses Google’s connectivity check:
https://www.gstatic.com/generate_204


import React, { useEffect } from "react";
import { useNetworkStatus } from "react-network-banner";

function App() {
  const status = useNetworkStatus();

  useEffect(() => {
    if (status === "offline") {
      alert("⚠️ You are offline!");
    } else if (status === "poor") {
      alert("⚠️ Your connection is unstable!");
    } else if (status === "good") {
      alert("✅ Back online!");
    }
  }, [status]);

  return <div>Network status: {status}</div>;
}


Example: Custom messages, icons, and health check

import { NetworkBanner } from "react-network-banner";
import { FiWifiOff, FiWifi, FiAlertTriangle } from "react-icons/fi";

function App() {
  return (
    <NetworkBanner
      checkUrl="/health"
      timeout={3000}
      position="bottom"
      messages={{
        offline: "Connection lost",
        poor: "Poor connection detected...",
        good: "Back online!",
      }}
      icons={{
        offline: <FiWifiOff />,
        poor: <FiAlertTriangle />,
        good: <FiWifi />,
      }}
      className="my-banner"
    />
  );
}

```


### ⚙️ Props / API Reference

```bash

<NetworkBanner /> 
| Prop        | Type                                                              | Default                                  | Description                                                                                  |
| ----------- | ----------------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| `checkUrl`  | `string`                                                          | `"https://www.gstatic.com/generate_204"` | Endpoint used to verify real connectivity. Can be replaced with your own `/health` endpoint. |
| `timeout`   | `number`                                                          | `5000`                                   | Timeout (ms) for connectivity check.                                                         |
| `messages`  | `Partial<Record<"offline" \| "poor" \| "good", string>>`          | See below                                | Custom text messages for each state.                                                         |
| `icons`     | `Partial<Record<"offline" \| "poor" \| "good", React.ReactNode>>` | Wi-Fi icons                              | Custom icons for each state.                                                                 |
| `position`  | `"top"` \| `"bottom"`                                             | `"top"`                                  | Banner placement.                                                                            |
| `duration`  | `number`                                                          | `3000`                                   | How long the “back online” banner stays visible (ms).                                        |
| `className` | `string`                                                          | `""`                                     | Custom CSS classes.                                                                          |
| `style`     | `React.CSSProperties`                                             | `{}`                                     | Inline styles.                                                                               |

```

 ## 🔧 Custom Health Check Endpoint

 ```bash 
You can replace Google’s generate_204 with your own backend health check.

// server.js
import express from "express";
const app = express();

app.get("/health", (req, res) => {
  res.sendStatus(204); // respond with 204 No Content
});

app.listen(3000, () => console.log("Server running on port 3000"));

Now your app can do:
<NetworkBanner checkUrl="http://localhost:3000/health" />
```
