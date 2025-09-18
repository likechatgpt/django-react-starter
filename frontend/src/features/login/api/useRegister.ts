// File: frontend/src/features/login/api/useRegister.ts
import { type UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useLocation } from "wouter";
import { API_ROOT_URL } from "@/api/config";
import type { ApiError } from "@/api/types";
import { performRequest } from "@/api/utils";
import { routeConfigMap } from "@/router";

export type RegisterRequestData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegisterErrorCallback = (errorMessage: string) => void;

type UseRegisterOptions = {
  onEmailError?: RegisterErrorCallback;
};

type UseRegister = (options?: UseRegisterOptions) => UseMutationResult<void, ApiError, RegisterRequestData, unknown>;

export const useRegister: UseRegister = (options = {}) => {
  const url = `${API_ROOT_URL}/auth/register/`;
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  
  return useMutation({
    mutationFn: async (data: RegisterRequestData): Promise<void> => {
      await performRequest(url, {
        method: "POST",
        data: {
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appConfig"] });
      queryClient.invalidateQueries({ queryKey: ["self"] });
      toast.success(t("Account created successfully"));
      navigate(routeConfigMap.homepage.path);
    },
    onError: (error) => {
      if ("status" in error && error.status === 400) {
        if (error.errors?.email) {
          const emailError = error.errors.email[0];
          if (emailError === "This email is already used" && options.onEmailError) {
            options.onEmailError(emailError);
          } else {
            toast.error(emailError);
          }
        } else if (error.errors?.password) {
          toast.error(error.errors.password[0]);
        } else if (error.errors?.confirmPassword) {
          toast.error(error.errors.confirmPassword[0]);
        } else {
          toast.error(t("Registration failed"));
        }
      } else {
        toast.error(t("Something went wrong"));
      }
    },
  });
};