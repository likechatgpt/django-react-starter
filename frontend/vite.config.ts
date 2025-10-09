// File: vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import { visualizer } from "rollup-plugin-visualizer";

const runningInDocker = fs.existsSync("/.dockerenv");
const backendTarget =
  process.env.VITE_BACKEND_PROXY_TARGET ||
  process.env.BACKEND_PROXY_TARGET ||
  (runningInDocker ? "http://api:8000" : "http://127.0.0.1:8000");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Bundle analyzer - generates stats.html after build
    visualizer({
      filename: "dist/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: "treemap", // 'treemap', 'sunburst', 'network'
    }),
  ],
  server: {
    host: "localhost",
    port: 3000,
    proxy: {
      "/api": {
        target: backendTarget, // Match the Django server
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Proxying request:', req.method, req.url);
          });
        },
      },
      "/admin": {
        target: backendTarget,
        changeOrigin: true,
        secure: false,
      },
      "/static": {
        target: backendTarget,
        changeOrigin: true,
        secure: false,
      },
      "/media": {
        target: backendTarget,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "static",
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },
});
