// File: src/features/settings/api/useDeleteAccount.ts

import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useLocation } from "wouter";
import { API_ROOT_URL } from "@/api/config";
import type { ApiError } from "@/api/types";
import { performRequest } from "@/api/utils";
import { routeConfigMap } from "@/router";

type UseDeleteAccount = () => UseMutationResult<void, ApiError, void, unknown>;

export const useDeleteAccount: UseDeleteAccount = () => {
  const url = `${API_ROOT_URL}/self/account/`;
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [, navigate] = useLocation();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      await performRequest(url, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["self"] });
      queryClient.removeQueries({ queryKey: ["self"] });
      toast.success(t("Your account has been deleted"));
      navigate(routeConfigMap.login.path);
    },
    onError: ({ status }) => {
      if (status === 401) {
        toast.error(t("Your session has expired"));
      } else if (status === 403) {
        toast.error(t("You are not authorized to delete this account"));
      } else {
        toast.error(t("Something went wrong"));
      }
    },
  });
};