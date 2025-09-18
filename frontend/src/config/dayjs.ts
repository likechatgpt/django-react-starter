// File: src/config/dayjs.ts
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import updateLocale from "dayjs/plugin/updateLocale";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { Locale, DEFAULT_LOCALE } from "./i18n";
import "dayjs/locale/en";
import "dayjs/locale/zh-cn";

dayjs.extend(calendar);
dayjs.extend(updateLocale);
dayjs.extend(weekOfYear);

const calendarFormats: Record<Locale, Record<string, string>> = {
  en: {
    sameDay: "[Today at] HH:mm",
    nextDay: "[Tomorrow at] HH:mm",
    nextWeek: "[Next] dddd [at] HH:mm",
    lastDay: "[Yesterday at] HH:mm",
    lastWeek: "[Last] dddd [at] HH:mm",
    sameElse: "[On] MM/DD/YYYY [at] HH:mm"
  },
  zh: {
    sameDay: "[今天] HH:mm",
    nextDay: "[明天] HH:mm",
    nextWeek: "[下]dddd HH:mm",
    lastDay: "[昨天] HH:mm",
    lastWeek: "[上]dddd HH:mm",
    sameElse: "YYYY/MM/DD HH:mm"
  }
};

const toDayjsLocale = (locale: Locale): string => (locale === "zh" ? "zh-cn" : "en");

const applyDayjsLocales = () => {
  dayjs.updateLocale("en", { calendar: calendarFormats.en });
  dayjs.updateLocale("zh-cn", { calendar: calendarFormats.zh });
  dayjs.locale(toDayjsLocale(DEFAULT_LOCALE));
};

applyDayjsLocales();