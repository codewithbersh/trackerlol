import { TransactionType } from "@prisma/client";
import prismadb from "@/lib/prismadb";
import { stringToDate } from "@/lib/utils";
import { addDays } from "date-fns";
import { getCurrentUser } from "./get-current-user";
import { cache } from "react";

interface GetTransactionsProps {
  to?: string;
  from?: string;
  type?: string;
  slug?: string;
}

export const getTransactions = cache(
  async ({ to, from, type, slug }: GetTransactionsProps) => {
    const user = await getCurrentUser();

    const lte = stringToDate(to);
    return await prismadb.transaction.findMany({
      where: {
        userId: user.id,
        date: {
          gte: stringToDate(from),
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
  }
);
