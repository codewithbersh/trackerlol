import prismadb from "@/lib/prismadb";
import { getCurrentUser } from "./get-current-user";
import { cache } from "react";
import { redirect } from "next/navigation";
import {
  GroupedTransactionsType,
  TransactionWithCategoryWithAmountAsNumber,
} from "@/types/types";
import { format } from "date-fns";

interface GetTransactionsProps {
  to?: Date;
  from?: Date;
  type?: string;
  slug?: string;
}

export const getTransactions = cache(
  async ({ to, from, type, slug }: GetTransactionsProps) => {
    const user = await getCurrentUser();

    if (!user) {
      redirect("/login");
    }

    const transactions = await prismadb.transaction.findMany({
      where: {
        userId: user.id,
        date: {
          gte: from ?? undefined,
          lte: to ?? undefined,
        },
        type: type as "INCOME" | "EXPENSE" | undefined,
        category: {
          slug,
        },
      },
      orderBy: {
        date: "desc",
      },
      include: {
        category: true,
      },
    });

    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction,
      amount: Number(transaction.amount),
    }));

    const groupedMap: Record<
      string,
      TransactionWithCategoryWithAmountAsNumber[]
    > = {};

    for (const transaction of formattedTransactions) {
      const date = format(transaction.date, "EEE, MMM d");

      if (!groupedMap[date]) {
        groupedMap[date] = [];
      }
      groupedMap[date].push(transaction);
    }

    const grouped = Object.entries(groupedMap).map(([date, transactions]) => ({
      date,
      transactions,
    }));

    const formattedGroup: GroupedTransactionsType[] = [];

    for (const group of grouped) {
      const sum = group.transactions.reduce((total, transaction) => {
        return (
          total +
          (transaction.type === "INCOME"
            ? transaction.amount
            : -1 * transaction.amount)
        );
      }, 0);

      formattedGroup.push({ ...group, sum: sum });
    }

    return formattedGroup;
  },
);
