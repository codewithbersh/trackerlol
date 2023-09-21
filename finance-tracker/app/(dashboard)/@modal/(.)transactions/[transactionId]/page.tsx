import { Dialog, InterceptedDialogContent } from "@/components/ui/dialog";
import { getTransaction } from "@/actions/get-transaction";
import { TransactionForm } from "@/components/forms/transaction-form";
import { getCategories } from "@/actions/get-categories";

interface TransactionIdModalProps {
  params: { transactionId: string };
}

const TransactionIdModal = async ({
  params: { transactionId },
}: TransactionIdModalProps) => {
  const transaction = await getTransaction({ transactionId });
  const { income, expense } = await getCategories();
  return (
    <Dialog open>
      <InterceptedDialogContent>
        <TransactionForm
          initialData={transaction}
          categories={{ income, expense }}
        />
      </InterceptedDialogContent>
    </Dialog>
  );
};

export default TransactionIdModal;
