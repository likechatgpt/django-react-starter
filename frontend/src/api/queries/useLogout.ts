// File: src/api/queries/useLogout.ts
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { API_ROOT_URL } from "@/api/config";
import { performRequest } from "@/api/utils";
import { routeConfigMap } from "@/router";
import type { ApiError } from "../types";

type UseLogout = () => UseMutationResult<void, ApiError, void, unknown>;

export const useLogout: UseLogout = () => {
  const url = `${API_ROOT_URL}/auth/logout/`;
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      try {
        await performRequest(url, { method: "POST" });
      } catch (error: any) {
        // If we get a 401, the user might already be logged out
        // If we get a 403, it might be a CSRF issue, but we still want to log out locally
        if (error?.status === 401 || error?.status === 403) {
          console.log(`Logout received ${error.status}, treating as success (already logged out or CSRF issue)`);
          return; // Don't throw, treat as success
        }
        throw error;
      }
    },
    onSuccess: () => {
      // Clear all queries related to user authentication
      queryClient.resetQueries({ queryKey: ["self"] });
      queryClient.resetQueries({ queryKey: ["auth", "check"] });
      queryClient.clear();
      toast.success(t("Logged out successfully"));
      navigate(routeConfigMap.login.path);
    },
    onError: (error) => {
      console.error('Logout error:', error);
      // Even if logout fails, clear local state and redirect
      queryClient.resetQueries({ queryKey: ["self"] });
      queryClient.resetQueries({ queryKey: ["auth", "check"] });
      queryClient.clear();
      toast.success(t("Logged out successfully"));
      navigate(routeConfigMap.login.path);
    },
  });
};