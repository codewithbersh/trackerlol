import { TransactionType } from "@prisma/client";
import prismadb from "@/lib/prismadb";
import { stringToDate } from "@/lib/utils";

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
  return await prismadb.transaction.findMany({
    where: {
      userId,
      date: {
        gte: stringToDate(from),
        lte: stringToDate(to),
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
