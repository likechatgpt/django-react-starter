// File: src/api/queries/useAppConfig.ts
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { ApiError } from "../types";
import { apiGet } from "../utils";

export type AppConfig = {
  debug: boolean;
  mediaUrl: string;
  staticUrl: string;
  appVersion: string;
};

export type ApiAppConfig = {
  debug: boolean;
  media_url: string;
  static_url: string;
  app_version: string;
};

type UseAppConfigReturn = {
  isPending: boolean;
  isError: boolean;
  error: ApiError | null;
  data?: AppConfig;
};

export const useAppConfig = (): UseAppConfigReturn => {
  const { isPending, isError, error, data } = useQuery<ApiAppConfig, ApiError, AppConfig>({
    queryKey: ["appConfig"],
    queryFn: () => apiGet("/app/config/"),
    select: (data) => ({
      debug: data.debug,
      mediaUrl: data.media_url,
      staticUrl: data.static_url,
      appVersion: data.app_version,
    }),
    retry: (failureCount, error) => {
      // Don't retry CSRF-related errors immediately
      if (error?.status === 403) {
        return failureCount < 1;
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return useMemo(
    () => ({
      isPending,
      isError,
      error,
      data,
    }),
    [isPending, isError, error, data],
  );
};