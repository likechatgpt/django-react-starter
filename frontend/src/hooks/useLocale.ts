// File: src/hooks/useLocale.ts
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "dayjs/locale/en";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, type Locale } from "@/config/i18n";
import { useLocalStorage } from "./useLocalStorage";

export type UseLocaleReturn = {
  currentLocale: Locale;
  initLocale: () => void;
  setLocale: (locale: Locale) => void;
  isInitialized: boolean;
};

const validLocales: Locale[] = ["en", "zh"];
const dayjsLocaleMap: Record<Locale, string> = { en: "en", zh: "zh-cn" };

export const useLocale = (): UseLocaleReturn => {
  const { i18n, ready } = useTranslation();
  const isInitialized = ready;

  const [storedLocale, updateStoredLocale] = useLocalStorage<Locale>(
    LOCALE_STORAGE_KEY,
    DEFAULT_LOCALE
  );

  const currentLocale =
    storedLocale && validLocales.includes(storedLocale) ? storedLocale : DEFAULT_LOCALE;

  useEffect(() => {
    if (storedLocale && !validLocales.includes(storedLocale)) {
      updateStoredLocale(DEFAULT_LOCALE);
    }
  }, [storedLocale, updateStoredLocale]);

  const setLocale = useCallback(
    async (locale: Locale) => {
      if (!isInitialized || !validLocales.includes(locale)) return;
      try {
        if (i18n && typeof i18n.changeLanguage === "function") {
          await i18n.changeLanguage(locale);
          updateStoredLocale(locale);

          try {
            dayjs.locale(dayjsLocaleMap[locale] || "en");
          } catch (dayjsError) {
            console.error("Failed to set dayjs locale:", dayjsError);
            dayjs.locale(dayjsLocaleMap[DEFAULT_LOCALE]);
          }
        }
      } catch (error) {
        console.error("Failed to change locale:", error);
      }
    },
    [isInitialized, i18n, updateStoredLocale]
  );

  const initLocale = useCallback(() => {
    if (isInitialized) setLocale(currentLocale);
  }, [isInitialized, currentLocale, setLocale]);

  return { currentLocale, setLocale, initLocale, isInitialized };
};