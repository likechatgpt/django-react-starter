// File: src/components/ui/Logo.tsx

import type React from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { jkdevLogoUrl } from "@/assets";

export const Logo: React.FC = memo(() => {
  const { t } = useTranslation();
  return <img data-testid="logo" src={jkdevLogoUrl} alt={t("JKDev Logo")} />;
});