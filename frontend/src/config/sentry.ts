// File: src/config/sentry.ts

import * as Sentry from "@sentry/react";

const DSN = import.meta.env.VITE_SENTRY_DSN as string | undefined;
const RELEASE = import.meta.env.VITE_APP_VERSION as string | undefined;
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT as string | undefined;

Sentry.init({
  dsn: DSN || "",
  release: RELEASE ? `django_react_starter@${RELEASE}` : "django_react_starter@unknown",
  sendDefaultPii: false, // GDPR
  environment: ENVIRONMENT || "development",
  sampleRate: 0.2,
  tracesSampleRate: 0.2,
  profilesSampleRate: 0.2,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
    Sentry.browserApiErrorsIntegration(),
  ],
  tracePropagationTargets: [
    "localhost",
    ...(import.meta.env.VITE_SENTRY_TRACE_TARGETS
      ? (import.meta.env.VITE_SENTRY_TRACE_TARGETS as string).split(",")
      : [
          /^https:\/\/django_react_starter\.jkdev\.app\/api/,
          /^https:\/\/django_react_starter.fly.dev\.jkdev\.app\/api/,
        ]),
  ],
});