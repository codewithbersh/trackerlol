import { TransactionType } from "@prisma/client";
import prismadb from "@/lib/prismadb";
import { stringToDate } from "@/lib/utils";

interface GetTransactionsProps {
  userId: string;
  categoryId: string;
  to?: string;
  from?: string;
  type?: string;
}

export async function getTransactions({
  userId,
  categoryId,
  to = "",
  from = "",
  type,
}: GetTransactionsProps) {
  return await prismadb.transaction.findMany({
    where: {
      userId,
      categoryId,
      date: {
        gte: stringToDate(from),
        lte: stringToDate(to),
      },
      type: type
        ? type.toUpperCase() === "EXPENSE" || type.toUpperCase() === "INCOME"
          ? (type.toUpperCase() as TransactionType)
          : undefined
        : undefined,
    },
    orderBy: {
      date: "desc",
    },
    include: {
      category: true,
    },
  });
}
