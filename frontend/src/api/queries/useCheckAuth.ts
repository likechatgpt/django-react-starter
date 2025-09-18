// File: src/api/queries/useCheckAuth.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useLocation } from "wouter";
import { API_ROOT_URL } from "@/api/config";
import { routeConfigMap } from "@/router";
import type { ApiError } from "../types";
import { performRequest } from "../utils";
import { useSelf } from "./useSelf";

type UseCheckAuthReturn = {
  isPending: boolean;
  isError: boolean;
  error: ApiError | null;
};

export const useCheckAuth = (): UseCheckAuthReturn => {
  const url = `${API_ROOT_URL}/auth/check/`;
  const queryClient = useQueryClient();
  const { data: user } = useSelf();
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  
  const { isPending, isError, error } = useQuery<null, ApiError, null, readonly ["auth", "check"]>({
    queryKey: ["auth", "check"] as const,
    queryFn: async () => {
      await performRequest(url, { method: "GET" });
      return null;
    },
    enabled: !!user,
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry auth failures
      if (error?.status === 401 || error?.status === 403) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Handle authentication errors
  useEffect(() => {
    if (error?.status === 401) {
      queryClient.removeQueries({ queryKey: ["auth", "check"] });
      queryClient.removeQueries({ queryKey: ["self"] });
      toast.warning(t("Your session has expired" as any));
      navigate(routeConfigMap.login.path);
    }
  }, [error, queryClient, t, navigate]);

  return useMemo(
    () => ({
      isPending,
      isError,
      error,
    }),
    [isPending, isError, error],
  );
};