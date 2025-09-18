// File: src/features/login/api/useLogin.ts
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

export type LoginRequestData = {
  email: string;
  password: string;
};

type UseLogin = () => UseMutationResult<
  void,
  ApiError,
  LoginRequestData,
  unknown
>;

export const useLogin: UseLogin = () => {
  const url = `${API_ROOT_URL}/auth/login/`;
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [, navigate] = useLocation();

  return useMutation({
    mutationFn: async (data: LoginRequestData): Promise<void> => {
      console.log('Attempting login with data:', { email: data.email, password: '[REDACTED]' });
      await performRequest(url, {
        method: "POST",
        data,
      });
    },
    onSuccess: () => {
      console.log('Login successful, invalidating queries and navigating');
      queryClient.invalidateQueries({ queryKey: ["appConfig"] });
      queryClient.invalidateQueries({ queryKey: ["self"] });
      queryClient.invalidateQueries({ queryKey: ["auth", "check"] });
      navigate(routeConfigMap.homepage.path);
      toast.success(t("Successfully logged in"));
    },
    onError: (error) => {
      console.error('Login error:', error);
      if (error.status === 400) {
        toast.error(t("Invalid email or password"));
      } else if (error.status === 403) {
        toast.error(t("CSRF token error. Please refresh the page and try again."));
      } else if (error.status === 429) {
        toast.error(t("Too many login attempts. Please try again later."));
      } else {
        toast.error(t("Login failed. Please try again."));
      }
    },
  });
};