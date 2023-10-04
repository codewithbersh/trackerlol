import { TransactionWithCategoryWithAmountAsNumber } from "@/types/types";
import { Category, TransactionType } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  isValid,
  parseISO,
  startOfMonth,
  startOfWeek,
  startOfYear,
  endOfDay,
  addMinutes,
  format,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  parse,
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

export type GroupedTransactions = {
  date: string;
  transactions: TransactionWithCategoryWithAmountAsNumber[];
};

export function groupTransactionsByDate(
  transactions: TransactionWithCategoryWithAmountAsNumber[],
): GroupedTransactions[] {
  const groupedMap: Record<
    string,
    TransactionWithCategoryWithAmountAsNumber[]
  > = {};

  for (const transaction of transactions) {
    const date = format(transaction.date, "yyyy-MM-dd");

    if (!groupedMap[date]) {
      groupedMap[date] = [];
    }
    groupedMap[date].push(transaction);
  }

  const grouped: GroupedTransactions[] = Object.entries(groupedMap).map(
    ([date, transactions]) => ({
      date,
      transactions,
    }),
  );

  return grouped;
}

export const stringToDate = (date: string | undefined | null) => {
  if (!date) return undefined;
  const parsedDate = parseISO(date);
  if (isValid(parsedDate)) {
    return parsedDate;
  }
  return undefined;
};

export const validateTypeQuery = (type: string | undefined) => {
  if (!type) return undefined;

  if (["EXPENSE", "INCOME"].includes(type.toUpperCase())) {
    return type.toUpperCase() as TransactionType;
  }

  return undefined;
};

export const validateCategoryQuery = (
  categories: Category[],
  category: string | null,
): Category | undefined => {
  if (!category) return undefined;

  return categories.find((item) => item.slug === category);
};

export function getRangeDefaultValue(range: string | undefined) {
  switch (range?.toLowerCase()) {
    case "month":
      return "month";
    case "year":
      return "year";
    default:
      return "week";
  }
}

export const groupTransactionsByCategory = (
  transactions: TransactionWithCategoryWithAmountAsNumber[],
) => {
  const groupedExpenses: {
    [key: string]: TransactionWithCategoryWithAmountAsNumber[];
  } = {};

  transactions.forEach((transaction) => {
    const slug = transaction.category.slug;
    if (!groupedExpenses[slug]) {
      groupedExpenses[slug] = [];
    }
    groupedExpenses[slug].push(transaction);
  });

  return groupedExpenses;
};

export function toTitleCase(input: string): string {
  return input.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

interface GetTotalAmountPerCategoryProps {
  group: {
    [key: string]: TransactionWithCategoryWithAmountAsNumber[];
  };
}
export const getTotalAmountPerCategory = ({
  group,
}: GetTotalAmountPerCategoryProps) => {
  const totalAmountPerCategory: Record<string, number> = {};
  let totalAmountForType = 0;
  const keys = Object.keys(group);

  const categoriesWithAmounts = keys.map((key) => ({
    category: key,
    amount: group[key].reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    ),
  }));

  categoriesWithAmounts.sort((a, b) => b.amount - a.amount);

  categoriesWithAmounts.forEach((item) => {
    totalAmountPerCategory[item.category] = item.amount;
  });

  totalAmountPerCategory["totalForType"] = categoriesWithAmounts.reduce(
    (acc, item) => acc + item.amount,
    0,
  );

  return totalAmountPerCategory;
};

export function getCategoryBySlug(
  slug: string,
  transactions: TransactionWithCategoryWithAmountAsNumber[],
) {
  return (
    transactions.find((item) => item.category.slug === slug)?.category || null
  );
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
    case "month":
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
      const weekCurrent = {
        from: startOfWeek(todayStartOfDay),
        to: endOfWeek(todayEndOfDay),
      };

      const weekPrevious = {
        from: subWeeks(weekCurrent.from, 1),
        to: subWeeks(weekCurrent.to, 1),
      };

      return { current: weekCurrent, previous: weekPrevious };
  }
}

export function floorDate(date: Date) {
  const localDate = addMinutes(date, date.getTimezoneOffset());

  return new Date(format(localDate, "yyyy-MM-dd'T'00:00:00.S'Z'"));
}

export function ceilingDate(date: Date) {
  const endOfDayDate = setMilliseconds(
    setSeconds(setMinutes(setHours(date, 23), 59), 59),
    999,
  );
  return endOfDay(endOfDayDate);
}

export function isValidDateFormat(dateString: string) {
  const parsedDate = parse(dateString, "yyyy-MM-dd", new Date());
  return isValid(parsedDate);
}
