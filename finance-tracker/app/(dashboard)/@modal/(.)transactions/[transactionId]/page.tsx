import prismadb from "@/lib/prismadb";
import { notFound } from "next/navigation";

import { ExpenseForm } from "@/components/modals/transaction/expense/expense-form";
import { Dialog, InterceptedDialogContent } from "@/components/ui/dialog";

interface TransactionIdModalProps {
  params: { transactionId: string };
}

const TransactionIdModal = async ({
  params: { transactionId },
}: TransactionIdModalProps) => {
  const transaction = await prismadb.transaction.findUnique({
    where: {
      id: transactionId,
    },
  });

  if (!transaction) notFound();
  return (
    <Dialog open>
      <InterceptedDialogContent>
        <ExpenseForm
          initialData={{ ...transaction, amount: Number(transaction.amount) }}
        />
      </InterceptedDialogContent>
    </Dialog>
  );
};

export default TransactionIdModal;
