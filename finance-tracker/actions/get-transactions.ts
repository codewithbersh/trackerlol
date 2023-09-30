import { TransactionType } from "@prisma/client";
import prismadb from "@/lib/prismadb";
import { stringToDate } from "@/lib/utils";
import { addDays } from "date-fns";
import { getCurrentUser } from "./get-current-user";
import { cache } from "react";
import { redirect } from "next/navigation";

interface GetTransactionsProps {
  to?: string | Date;
  from?: string | Date;
  type?: string;
  slug?: string;
}

export const getTransactions = cache(
  async ({ to, from, type, slug }: GetTransactionsProps) => {
    const user = await getCurrentUser();

    if (!user) {
      redirect("/login");
    }

    const lte = typeof to === "string" ? stringToDate(to) : to;

    const transactions = await prismadb.transaction.findMany({
      where: {
        userId: user.id,
        date: {
          gte: typeof from === "string" ? stringToDate(from) : from,
          lte: lte ? addDays(lte, 1) : undefined,
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
  }
);
