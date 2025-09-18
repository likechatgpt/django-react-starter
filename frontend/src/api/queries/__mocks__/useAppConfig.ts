// File: src/api/queries/__mocks__/useAppConfig.ts

import type { ApiAppConfig } from "../useAppConfig";

export const APP_CONFIG_MOCK: ApiAppConfig = {
  debug: false,
  media_url: import.meta.env.VITE_MEDIA_URL || "http://localhost:8000/media/",
  static_url: import.meta.env.VITE_STATIC_URL || "http://localhost:8000/static/",
  app_version: "4.2.0",
};