import { cache } from "react";
import prismadb from "@/lib/prismadb";

interface GetTransactionsTotalProps {
  from: Date;
  to: Date;
  userId: string;
}

export const getTransactionsTotal = cache(
  async ({ from, to, userId }: GetTransactionsTotalProps) => {
    return await prismadb.transaction.aggregate({
      where: {
        userId,
        date: {
          gte: from,
          lt: to,
        },
        type: "EXPENSE",
      },
      _sum: {
        amount: true,
      },
    });
  },
);
