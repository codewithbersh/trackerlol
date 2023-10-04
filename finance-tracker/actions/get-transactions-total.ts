import { cache } from "react";
import prismadb from "@/lib/prismadb";
import { getCurrentUser } from "./get-current-user";
import { redirect } from "next/navigation";

interface GetTransactionsTotalProps {
  from: Date;
  to: Date;
  categoryId?: string;
}

export const getTransactionsTotal = cache(
  async ({ from, to, categoryId }: GetTransactionsTotalProps) => {
    const user = await getCurrentUser();

    if (!user) {
      return redirect("/login");
    }

    return await prismadb.transaction.aggregate({
      where: {
        userId: user.id,
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
