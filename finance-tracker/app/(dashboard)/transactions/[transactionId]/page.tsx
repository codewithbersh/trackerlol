import { getTransaction } from "@/actions/get-transaction";
import { getCategories } from "@/actions/get-categories";

import { FormTransaction } from "@/components/forms/form-transaction";

interface TransactionIdPageProps {
  params: { transactionId: string };
}

const TransactionIdPage = async ({
  params: { transactionId },
}: TransactionIdPageProps) => {
  const transaction = await getTransaction({ transactionId });
  const { income, expense } = await getCategories();
  return (
    <div>
      <FormTransaction
        initialData={transaction}
        categories={{ income, expense }}
      />
    </div>
  );
};

export default TransactionIdPage;
