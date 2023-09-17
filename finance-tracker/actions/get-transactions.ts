import prismadb from "@/lib/prismadb";

interface GetTransactionsProps {
  userId: string;
  categoryId: string;
  to?: string;
  from?: string;
}

export async function getTransactions({
  userId,
  categoryId,
  to = "",
  from = "",
}: GetTransactionsProps) {
  const startDate = Date.parse(from) ? new Date(from) : undefined;
  const endDate = Date.parse(to) ? new Date(to) : undefined;

  return await prismadb.transaction.findMany({
    where: {
      userId,
      categoryId,
      date: {
        gte: startDate,
        lte: endDate,
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
