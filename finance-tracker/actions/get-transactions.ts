import { TransactionType } from "@prisma/client";
import prismadb from "@/lib/prismadb";
import { getCurrentUser } from "./get-current-user";
import { cache } from "react";
import { redirect } from "next/navigation";

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
          gte: from,
          lte: to,
        },
        type: type
          ? type.toUpperCase() === "EXPENSE" || type.toUpperCase() === "INCOME"
            ? (type.toUpperCase() as TransactionType)
            : undefined
          : undefined,
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

    return formattedTransactions;
  },
);
