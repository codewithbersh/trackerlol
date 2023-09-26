import { TransactionWithCategoryWithAmountAsNumber } from "@/types/types";
import {
  Category,
  TimeFrameType,
  Transaction,
  TransactionType,
} from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isValid,
  parseISO,
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

export interface TransactionWithCategory extends Transaction {
  category: Category;
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
