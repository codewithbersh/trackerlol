import { notFound } from "next/navigation";

import { ExpenseForm } from "@/components/modals/transaction/expense/expense-form";
import { Dialog, InterceptedDialogContent } from "@/components/ui/dialog";
import { getTransaction } from "@/actions/get-transaction";

interface TransactionIdModalProps {
  params: { transactionId: string };
}

const TransactionIdModal = async ({
  params: { transactionId },
}: TransactionIdModalProps) => {
  const transaction = await getTransaction({ transactionId });
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
