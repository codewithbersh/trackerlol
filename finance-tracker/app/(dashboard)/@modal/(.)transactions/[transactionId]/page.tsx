import { getTransaction } from "@/actions/get-transaction";
import { getCategories } from "@/actions/get-categories";

import { Dialog, InterceptedDialogContent } from "@/components/ui/dialog";
import { FormTransaction } from "@/components/forms/form-transaction";

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
        <FormTransaction
          initialData={transaction}
          categories={{ income, expense }}
          isModal
        />
      </InterceptedDialogContent>
    </Dialog>
  );
};

export default TransactionIdModal;
