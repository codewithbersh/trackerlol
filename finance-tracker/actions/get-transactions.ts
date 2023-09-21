import { TransactionType } from "@prisma/client";
import prismadb from "@/lib/prismadb";
import { stringToDate } from "@/lib/utils";
import { add, addDays } from "date-fns";
import { getCurrentUser } from "./get-current-user";
import { redirect } from "next/navigation";

interface GetTransactionsProps {
  to?: string;
  from?: string;
  type?: string;
  slug?: string;
}

export async function getTransactions({
  to,
  from,
  type,
  slug,
}: GetTransactionsProps) {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/loign");
  }

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
