// File: src/api/config.ts
import { QueryClient } from "@tanstack/react-query";

export const CSRF_TOKEN_HEADER_NAME = "X-CSRFToken";
export const CSRF_TOKEN_COOKIE_NAME = "csrftoken";

// In development, use relative URLs to leverage Vite's proxy
// In production, use the environment variable
const isDevelopment = import.meta.env.DEV;

// For development, we'll use empty string to make URLs relative
// For production, use the env variable
const RAW_BASE = isDevelopment
  ? ""
  : (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

// If someone accidentally put /api/v1 into VITE_API_URL, strip it
const BASE = RAW_BASE.replace(/\/api\/v1$/i, "");

// API prefix
export const API_PREFIX = "/api/v1";

// In development, this will be just "/api/v1" (relative)
// In production, it will be the full URL
export const API_ROOT_URL = `${BASE}${API_PREFIX}`;

// Media/static URLs
export const MEDIA_URL = isDevelopment
  ? "/media/"
  : (import.meta.env.VITE_MEDIA_URL || `${BASE}/media/`);

export const STATIC_URL = isDevelopment
  ? "/static/"
  : (import.meta.env.VITE_STATIC_URL || `${BASE}/static/`);

// Debug log in development
if (import.meta.env.DEV) {
  console.log("Development mode: using relative URLs for proxy");
  console.log("API_ROOT_URL:", API_ROOT_URL);
  console.log("MEDIA_URL:", MEDIA_URL);
  console.log("STATIC_URL:", STATIC_URL);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      retry: (failureCount, error: any) => {
        // Don't retry on 401 (unauthorized) or 403 (forbidden)
        if (
          error?.status === 401 ||
          error?.status === 403 ||
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          return false;
        }
        // Don't retry on 400 (bad request) or 404 (not found)
        if (
          error?.status === 400 ||
          error?.status === 404 ||
          error?.response?.status === 400 ||
          error?.response?.status === 404
        ) {
          return false;
        }
        // Retry up to 2 times for server errors (5xx)
        if (error?.status >= 500 || error?.response?.status >= 500) {
          return failureCount < 2;
        }
        // Don't retry for other errors
        return false;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: (failureCount, error: any) => {
        // Don't retry authentication errors
        if (error?.status === 401 || error?.status === 403) {
          return false;
        }
        // Retry CSRF failures once (token might have been refreshed)
        if (error?.status === 403) {
          return failureCount < 1;
        }
        return false;
      },
    },
  },
});