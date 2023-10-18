import { getTransactions } from "@/actions/get-transactions";
import { getUserWithProfile } from "@/actions/get-user-with-profile";
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

  const user = await getUserWithProfile();

  return (
    <div className="space-y-16">
      <TransactionsGroups transactions={transactions} profile={user.profile} />
    </div>
  );
};
