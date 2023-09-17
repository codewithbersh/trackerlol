import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/get-current-user";
import { groupTransactionsByDate } from "@/lib/utils";
import { getTransactions } from "@/actions/get-transactions";

import { GroupedTransactions } from "@/components/transactions/grouped-transactions";

interface TransactionsPageProps {
  searchParams: {
    categoryId: string;
    from: string;
    to: string;
  };
}

const TransactionsPage = async ({
  searchParams: { categoryId, from, to },
}: TransactionsPageProps) => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const transactions = await getTransactions({
    userId: user.id,
    categoryId,
    from,
    to,
  });

  const groupedTransactions = groupTransactionsByDate(transactions);

  return (
    <div className="flex flex-col gap-8 py-24">
      {groupedTransactions.map((group) => (
        <GroupedTransactions group={group} key={group.date} />
      ))}
    </div>
  );
};

export default TransactionsPage;
