import prismadb from "@/lib/prismadb";
import { getCurrentUser } from "./get-current-user";
import { cache } from "react";

export const getTransaction = cache(
  async ({ transactionId: id }: { transactionId: string }) => {
    const user = await getCurrentUser();

    const transaction = await prismadb.transaction.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (transaction) {
      return { ...transaction, amount: Number(transaction.amount) };
    }

    return null;
  }
);
