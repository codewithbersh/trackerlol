import { Category, Prisma, Transaction } from "@prisma/client";
import { LucideIcon } from "lucide-react";

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type GroupedTransactionsType = {
  date: string;
  sum: number;
  transactions: TransactionWithCategoryWithAmountAsNumber[];
};

export type Route = {
  icon: LucideIcon;
  label: string;
  href: string;
  active: boolean;
};

export type CategoriesByType = {
  categories: Category[];
  income: Category[];
  expense: Category[];
};

export type TransactionWithCategory = Prisma.TransactionGetPayload<{
  include: { category: true };
}>;

export type TransactionWithAmountAsNumber = Prettify<
  Omit<Transaction, "amount"> & {
    amount: number;
  }
>;

export type TransactionWithCategoryWithAmountAsNumber = Prettify<
  Omit<TransactionWithCategory, "amount"> & {
    amount: number;
  }
>;

export type ReceiptWithCategory = Prisma.ReceiptGetPayload<{
  include: { category: true };
}>;

export type CategoryWithReceiptCount = {
  id: string;
  title: string;
  color: string;
  type: "EXPENSE" | "INCOME";
  slug: string;
  _count: {
    receipts: number;
  };
};

export type OverallBudgetWithLimitAsNumber = Omit<
  Prisma.OverallBudgetGetPayload<{}>,
  "limit"
> & {
  limit: number;
};

export type CategoryBudgetWithCategory = Prisma.CategoryBudgetGetPayload<{
  include: { category: true };
}>;

export type CategoryBudgetWithLimitAsNumber = Omit<
  Prisma.CategoryBudgetGetPayload<{ include: { category: true } }>,
  "limit"
> & {
  limit: number;
};

export type TopCategory = {
  id: string;
  name: string;
  color: string;
  value: number;
};
