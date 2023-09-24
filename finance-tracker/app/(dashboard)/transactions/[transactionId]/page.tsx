import { getTransaction } from "@/actions/get-transaction";

import { FormTransaction } from "@/components/forms/form-transaction";

interface TransactionIdPageProps {
  params: { transactionId: string };
}

const TransactionIdPage = async ({
  params: { transactionId },
}: TransactionIdPageProps) => {
  const transaction = await getTransaction({ transactionId });
  return (
    <div>
      <FormTransaction initialData={transaction} />
    </div>
  );
};

export default TransactionIdPage;
