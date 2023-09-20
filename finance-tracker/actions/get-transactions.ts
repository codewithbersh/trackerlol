import { TransactionType } from "@prisma/client";
import prismadb from "@/lib/prismadb";
import { stringToDate } from "@/lib/utils";
import { add, addDays } from "date-fns";

interface GetTransactionsProps {
  userId: string;
  to?: string;
  from?: string;
  type?: string;
  slug?: string;
}

export async function getTransactions({
  userId,
  to,
  from,
  type,
  slug,
}: GetTransactionsProps) {
  const lte = stringToDate(to);
  return await prismadb.transaction.findMany({
    where: {
      userId,
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
