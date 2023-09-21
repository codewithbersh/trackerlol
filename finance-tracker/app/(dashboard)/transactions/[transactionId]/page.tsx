import { notFound } from "next/navigation";

import { ExpenseForm } from "@/components/modals/transaction/expense/expense-form";
import { getTransaction } from "@/actions/get-transaction";

interface TransactionIdPageProps {
  params: { transactionId: string };
}

const TransactionIdPage = async ({
  params: { transactionId },
}: TransactionIdPageProps) => {
  const transaction = await getTransaction({ transactionId });

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
