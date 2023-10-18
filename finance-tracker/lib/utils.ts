import { Profile } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfMonth,
  startOfWeek,
  startOfYear,
  endOfDay,
  startOfDay,
  subDays,
  subMonths,
  subYears,
  subWeeks,
} from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function translateTheme(theme: string | undefined) {
  switch (theme) {
    case undefined || "system":
      return "auto";
    default:
      return theme;
  }
}

export function toTitleCase(input: string): string {
  return input.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function getAnalyticsDateRange(range: string | undefined) {
  const todayStartOfDay = startOfDay(new Date());
  const todayEndOfDay = endOfDay(new Date());
  switch (range?.toLowerCase()) {
    case "day":
      const dayCurrent = {
        from: todayStartOfDay,
        to: todayEndOfDay,
      };
      const dayPrevious = {
        from: subDays(todayStartOfDay, 1),
        to: subDays(todayEndOfDay, 1),
      };
      return { current: dayCurrent, previous: dayPrevious };
    case "week":
      const weekCurrent = {
        from: startOfWeek(todayStartOfDay),
        to: endOfWeek(todayEndOfDay),
      };

      const weekPrevious = {
        from: subWeeks(weekCurrent.from, 1),
        to: subWeeks(weekCurrent.to, 1),
      };

      return { current: weekCurrent, previous: weekPrevious };
    case "year":
      const yearCurrent = {
        from: startOfYear(todayStartOfDay),
        to: endOfYear(todayEndOfDay),
      };

      const yearPrevious = {
        from: subYears(yearCurrent.from, 1),
        to: subYears(yearCurrent.to, 1),
      };

      return { current: yearCurrent, previous: yearPrevious };
    default:
      const monthCurrent = {
        from: startOfMonth(todayStartOfDay),
        to: endOfMonth(todayStartOfDay),
      };

      const monthPrevious = {
        from: subMonths(monthCurrent.from, 1),
        to: subMonths(monthCurrent.to, 1),
      };

      return {
        current: monthCurrent,
        previous: monthPrevious,
      };
  }
}

const GTR_MAX_VALUE = 255;
const GTR_FORMULA = (2 / 100) * GTR_MAX_VALUE;

export function greenToRed(percentage: number) {
  percentage = percentage > 100 ? 100 : percentage < 0 ? 0 : percentage;

  const green =
    percentage <= 50
      ? GTR_MAX_VALUE
      : GTR_MAX_VALUE - (percentage - 50) * GTR_FORMULA;
  const red =
    percentage >= 50
      ? GTR_MAX_VALUE
      : GTR_MAX_VALUE - (50 - percentage) * GTR_FORMULA;
  const rgb = new Uint8Array([red, green, 0]);

  let redHex = rgb[0].toString(16);
  if (redHex.length == 1) {
    redHex = "0" + redHex;
  }

  let greenHex = rgb[1].toString(16);
  if (greenHex.length == 1) {
    greenHex = "0" + greenHex;
  }

  return "#" + redHex + greenHex + "00";
}

export const formatCurrency = ({
  profile,
  amount,
  signDisplay = "auto",
}: {
  profile: Profile | null;
  amount: number;
  signDisplay?: "auto" | "never";
}) => {
  if (!profile) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
      signDisplay: signDisplay,
    }).format(amount);
  }

  return new Intl.NumberFormat(profile.thousandsGroupStyle, {
    style: "currency",
    currency: profile.currency,
    maximumFractionDigits: profile.displayCents ? 2 : 0,
    signDisplay: signDisplay,
  }).format(amount);
};
