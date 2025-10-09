// File: src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";

const container = document.getElementById("root") as HTMLDivElement | null;
if (!container) throw new Error("Root element not found");
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <React.Suspense fallback="Loading...">
      <App />
    </React.Suspense>
  </React.StrictMode>,
);