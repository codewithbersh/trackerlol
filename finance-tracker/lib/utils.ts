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
  addDays,
  subSeconds,
  addMonths,
  addYears,
  addWeeks,
  parse,
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
  const today = new Date();
  switch (range?.toLowerCase()) {
    case "day":
      const dayCurrent = {
        from: floorDate(new Date()),
        to: subSeconds(addDays(floorDate(new Date()), 1), 1),
      };
      const dayPrevious = {
        from: addDays(dayCurrent.from, -1),
        to: addDays(dayCurrent.to, -1),
      };
      return { current: dayCurrent, previous: dayPrevious };
    case "month":
      const monthCurrent = {
        from: floorDate(startOfMonth(today)),
        to: subSeconds(addDays(floorDate(endOfMonth(today)), 1), 1),
      };

      const monthPrevious = {
        from: addMonths(monthCurrent.from, -1),
        to: addMonths(monthCurrent.to, -1),
      };

      return {
        current: monthCurrent,
        previous: monthPrevious,
      };
    case "year":
      const yearCurrent = {
        from: floorDate(startOfYear(today)),
        to: subSeconds(addDays(floorDate(endOfYear(today)), 1), 1),
      };

      const yearPrevious = {
        from: addYears(yearCurrent.from, 1),
        to: addYears(yearCurrent.to, 1),
      };

      return { current: yearCurrent, previous: yearPrevious };
    default:
      const weekCurrent = {
        from: floorDate(startOfWeek(today, { weekStartsOn: 0 })),
        to: subSeconds(
          addDays(floorDate(endOfWeek(today, { weekStartsOn: 0 })), 1),
          1,
        ),
      };

      const weekPrevious = {
        from: addWeeks(weekCurrent.from, -1),
        to: addWeeks(weekCurrent.to, -1),
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
