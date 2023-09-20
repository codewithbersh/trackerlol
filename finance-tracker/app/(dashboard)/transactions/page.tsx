import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/get-current-user";
import {
  groupTransactionsByDate,
  stringToDate,
  validateTypeQuery,
} from "@/lib/utils";
import { getTransactions } from "@/actions/get-transactions";
import { DateRange } from "react-day-picker";

import { GroupedTransactions } from "@/components/transactions/grouped-transactions";
import { FilterTransactions } from "@/components/transactions/filter/filter-transactions";

interface TransactionsPageProps {
  searchParams: {
    categoryId: string;
    from: string;
    to: string;
    type: string;
  };
}

const TransactionsPage = async ({
  searchParams: { categoryId, from, to, type },
}: TransactionsPageProps) => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const transactions = await getTransactions({
    userId: user.id,
    categoryId,
    from,
    to,
    type,
  });

  const groupedTransactions = groupTransactionsByDate(transactions);

  const dateRangeQuery: DateRange = {
    from: stringToDate(from),
    to: stringToDate(to),
  };

  const typeQuery = validateTypeQuery(type);

  return (
    <div className="flex flex-col gap-8 py-24">
      <FilterTransactions
        dateRangeQuery={dateRangeQuery}
        typeQuery={typeQuery}
      />
      {groupedTransactions.map((group) => (
        <GroupedTransactions group={group} key={group.date} />
      ))}
    </div>
  );
};

export default TransactionsPage;
