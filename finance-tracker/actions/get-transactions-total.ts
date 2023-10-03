import { cache } from "react";
import prismadb from "@/lib/prismadb";

interface GetTransactionsTotalProps {
  from: Date;
  to: Date;
  userId: string;
  categoryId?: string;
}

export const getTransactionsTotal = cache(
  async ({ from, to, userId, categoryId }: GetTransactionsTotalProps) => {
    return await prismadb.transaction.aggregate({
      where: {
        userId,
        date: {
          gte: from,
          lt: to,
        },
        type: "EXPENSE",
        categoryId,
      },
      _sum: {
        amount: true,
      },
    });
  },
);
