import { TransactionWithCategoryWithAmountAsNumber } from "@/types/types";
import { Category, TimeFrameType, TransactionType } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import {
  addMonths,
  addWeeks,
  differenceInDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  getDate,
  isValid,
  parseISO,
  setDate,
  startOfMonth,
  startOfWeek,
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
  transactions: TransactionWithCategoryWithAmountAsNumber[]
): GroupedTransactions[] {
  const groupedMap: Record<
    string,
    TransactionWithCategoryWithAmountAsNumber[]
  > = {};

  for (const transaction of transactions) {
    const date = new Date(transaction.date).toISOString().split("T")[0];
    if (!groupedMap[date]) {
      groupedMap[date] = [];
    }
    groupedMap[date].push(transaction);
  }

  const grouped: GroupedTransactions[] = Object.entries(groupedMap).map(
    ([date, transactions]) => ({
      date,
      transactions,
    })
  );

  return grouped;
}

export const stringToDate = (date: string | undefined) => {
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
  category: string
): Category | undefined => {
  if (!category) return undefined;

  return categories.find((item) => item.slug === category);
};

const daysOfWeek = (today: Date) => {
  return eachDayOfInterval({
    start: startOfWeek(today, { weekStartsOn: 0 }),
    end: endOfWeek(today, { weekStartsOn: 0 }),
  });
};

const daysOfMonth = (today: Date) => {
  return eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today).setDate(28),
  });
};

export const startDateChoices = (timeFrame: TimeFrameType) => {
  switch (timeFrame) {
    case "DAILY":
      return [new Date()];
    case "WEEKLY":
      return daysOfWeek(new Date());
    case "MONTHLY":
      return daysOfMonth(new Date());
  }
};

export const calculateDaysLeft = (
  timeFrame: TimeFrameType,
  startDate: Date
) => {
  const todayDay = getDate(new Date());
  const startDateDay = getDate(startDate);
  switch (timeFrame) {
    case "DAILY":
      return 0;
    case "WEEKLY":
      if (todayDay >= startDateDay) {
        return differenceInDays(addWeeks(startDate, 1), new Date());
      }

      return differenceInDays(setDate(new Date(), startDateDay), new Date());

    case "MONTHLY":
      if (todayDay >= startDateDay) {
        return differenceInDays(addMonths(startDate, 1), new Date());
      }

      return differenceInDays(setDate(new Date(), startDateDay), new Date());
  }
};

export const getBudgetTransactionRange = ({
  timeFrame,
  range,
  startDate,
}: {
  timeFrame: TimeFrameType;
  range: "to" | "from";
  startDate: Date;
}) => {
  switch (timeFrame) {
    case "DAILY":
      return new Date();
    case "WEEKLY":
      if (range === "from") {
        return startOfWeek(startDate, { weekStartsOn: 0 });
      }
      return endOfWeek(startDate, { weekStartsOn: 0 });
    case "MONTHLY":
      if (range === "from") {
        return startOfMonth(startDate);
      }
      return endOfMonth(startDate);
  }
};
