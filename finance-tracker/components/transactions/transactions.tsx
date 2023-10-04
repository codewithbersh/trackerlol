import { getTransactions } from "@/actions/get-transactions";
import { FiltersType } from "./utils";

import { TransactionsGroups } from "./transactions-groups";

interface TransactionsProps {
  filters: FiltersType;
}

export const Transactions = async ({
  filters: { from, to, category, type },
}: TransactionsProps) => {
  const transactions = await getTransactions({
    type,
    slug: category?.slug,
    from,
    to,
  });

  return (
    <div className="space-y-16">
      <TransactionsGroups transactions={transactions} />
    </div>
  );
};
