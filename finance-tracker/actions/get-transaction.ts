import { redirect } from "next/navigation";
import { cache } from "react";
import prismadb from "@/lib/prismadb";
import { getCurrentUser } from "./get-current-user";

export const getTransaction = cache(
  async ({ transactionId: id }: { transactionId: string }) => {
    const user = await getCurrentUser();
    if (!user) {
      redirect("/login");
    }

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
  },
);
