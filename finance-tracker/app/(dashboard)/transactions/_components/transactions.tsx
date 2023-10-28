import { serverClient } from "@/app/_trpc/server";

import { TransactionsClient } from "./transactions-client";

interface TransactionsProps {
  searchParams: { [key: string]: string | undefined };
}

export const Transactions = async ({ searchParams }: TransactionsProps) => {
  const { from, to, type, categoryId } = searchParams;

  const transactions = await serverClient.transaction.get({
    from,
    to,
    type,
    categoryId,
  });

  const profile = await serverClient.profile.get();

  if (transactions.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        No transactions.
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <TransactionsClient
        initialData={transactions}
        searchParams={searchParams}
        profile={profile}
      />
    </div>
  );
};
