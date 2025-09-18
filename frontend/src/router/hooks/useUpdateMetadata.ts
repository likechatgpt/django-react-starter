// File: src/router/hooks/useUpdateMetadata.ts

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { useLocale } from "@/hooks";
import { pathToRoute, type RouteKey } from "../routeConfig";

export const useUpdateMetadata = () => {
  const { t } = useTranslation();
  const { currentLocale } = useLocale();
  const [location] = useLocation();

  const routeTitles: Record<RouteKey, string> = {
    homepage: t("Django React Starter"),
    login: t("Login"),
    settings: t("Settings"),
    passwordReset: t("Password reset"),
    passwordResetConfirm: t("Password reset confirm"),
  };

  useEffect(() => {
    const routeKey = pathToRoute[location]?.key;
    document.title = routeTitles[routeKey] || t("Django React Starter");
    document.documentElement.lang = currentLocale;
  }, [location, t, currentLocale]);
};