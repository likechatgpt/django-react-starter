// File: src/config/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";

export type Locale = "en" | "zh";
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "django-react-starter-locale";

type ResourceShape = {
  translation: Record<string, string>;
  zod: Record<string, unknown>;
};

const loadTranslations = async (): Promise<Record<Locale, ResourceShape>> => {
  const resources: Record<Locale, ResourceShape> = {
    en: { translation: {}, zod: {} },
    zh: { translation: {}, zod: {} }
  };

  try {
    // Load translation files
    resources.en.translation = (await import("../../i18n/en.json")).default || {};
    resources.zh.translation = (await import("../../i18n/zh.json")).default || {};

    // Load zod translations
    const enZodTranslations = (await import("zod-i18n-map/locales/en/zod.json")).default || {};
    const zhZodTranslations = (await import("zod-i18n-map/locales/zh-CN/zod.json")).default || {};

    // Merge custom field name translations with zod translations
    resources.en.zod = {
      ...enZodTranslations,
      email: "Email",
      password: "Password",
      firstName: "First name",
      lastName: "Last name", 
      currentPassword: "Current password",
      newPassword: "New password",
      confirmPassword: "Confirm password"
    };

    resources.zh.zod = {
      ...zhZodTranslations,
      email: "邮箱",
      password: "密码",
      firstName: "名",
      lastName: "姓",
      currentPassword: "当前密码", 
      newPassword: "新密码",
      confirmPassword: "确认密码"
    };
  } catch (error) {
    console.error("Failed to load translations:", { error, resources });
  }
  return resources;
};

const initializeI18n = async () => {
  const resources = await loadTranslations();

  if (!i18n.isInitialized) {
    try {
      await i18n.use(initReactI18next).init({
        resources,
        lng: DEFAULT_LOCALE,
        fallbackLng: DEFAULT_LOCALE,
        supportedLngs: ["en", "zh"],
        load: "languageOnly",
        ns: ["translation", "zod"],
        defaultNS: "translation",
        debug: process.env.NODE_ENV === "development",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        initImmediate: false
      });

      z.setErrorMap(zodI18nMap);
    } catch (error) {
      console.error("Failed to initialize i18n:", error);
      throw error;
    }
  }
};

let initPromise: Promise<void> | null = null;

export const ensureI18nInitialized = async (): Promise<void> => {
  if (!initPromise) {
    initPromise = initializeI18n();
  }
  try {
    await initPromise;
    if (!i18n.isInitialized || typeof i18n.changeLanguage !== "function") {
      throw new Error("i18n initialization incomplete");
    }
  } catch (error) {
    console.error("i18n initialization failed:", error);
    initPromise = null;
    throw error;
  }
};

ensureI18nInitialized().catch(console.error);

export default i18n;