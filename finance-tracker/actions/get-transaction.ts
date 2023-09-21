import prismadb from "@/lib/prismadb";
import { getCurrentUser } from "./get-current-user";
import { redirect } from "next/navigation";

export const getTransaction = async ({
  transactionId: id,
}: {
  transactionId: string;
}) => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/login");
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
};
