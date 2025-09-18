// File: src/features/settings/api/useUpdatePassword.ts

import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { API_ROOT_URL } from "@/api/config";
import type { ApiError } from "@/api/types";
import { performRequest } from "@/api/utils";

export type UpdatePasswordRequestData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type UseUpdatePassword = () => UseMutationResult<
  void,
  ApiError,
  UpdatePasswordRequestData,
  unknown
>;

export const useUpdatePassword: UseUpdatePassword = () => {
  const { t } = useTranslation();
  const url = `${API_ROOT_URL}/self/password/`;
  return useMutation({
    mutationFn: async (data: UpdatePasswordRequestData): Promise<void> => {
      await performRequest(url, {
        method: "PUT",
        data: {
          current_password: data.currentPassword,
          new_password: data.newPassword,
        },
      });
    },
    onSuccess: () => {
      toast.success(t("Password updated"));
    },
    onError: ({ status, errors }) => {
      if (status === 400 && errors) {
        if (errors.current_password) {
          toast.error(t("Invalid current password"));
        } else if (errors.new_password) {
          toast.error(t("Password is too weak"));
        } else {
          toast.error(t("Failed to update password"));
        }
      } else if (status === 401) {
        toast.error(t("Your session has expired"));
      } else if (status === 403) {
        toast.error(t("You are not authorized to update this password"));
      } else {
        toast.error(t("Something went wrong"));
      }
    },
  });
};