import prismadb from "@/lib/prismadb";
import { notFound } from "next/navigation";

import { ExpenseForm } from "@/components/modals/transaction/expense/expense-form";

interface TransactionIdPageProps {
  params: { transactionId: string };
}

const TransactionIdPage = async ({
  params: { transactionId },
}: TransactionIdPageProps) => {
  const transaction = await prismadb.transaction.findUnique({
    where: {
      id: transactionId,
    },
  });

  if (!transaction) notFound();
  return (
    <div>
      <ExpenseForm
        initialData={{ ...transaction, amount: Number(transaction.amount) }}
      />
    </div>
  );
};

export default TransactionIdPage;
