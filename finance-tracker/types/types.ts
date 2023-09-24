import { TransactionWithCategory } from "@/lib/utils";
import { Transaction } from "@prisma/client";
import { LucideIcon } from "lucide-react";

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Route = {
  icon: LucideIcon;
  label: string;
  href: string;
  active: boolean;
};

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
