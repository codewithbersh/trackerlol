import { TransactionsClient } from "./transactions-client";
import { transactionCaller } from "@/trpc/routers/transactions";
import { profileCaller } from "@/trpc/routers/profile";

interface TransactionsProps {
  searchParams: { [key: string]: string | undefined };
}

export const Transactions = async ({ searchParams }: TransactionsProps) => {
  const { from, to, type, categoryId } = searchParams;

  const transactions = await transactionCaller.getAll({
    from,
    to,
    type,
    categoryId,
  });

  const profile = await profileCaller.get();

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
