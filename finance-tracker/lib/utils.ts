import { Category, Transaction, TransactionType } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { isValid, parseISO } from "date-fns";
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
  transactions: TransactionWithCategory[];
};

export function groupTransactionsByDate(
  transactions: TransactionWithCategory[]
): GroupedTransactions[] {
  const groupedMap: Record<string, TransactionWithCategory[]> = {};

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
