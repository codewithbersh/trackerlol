"use client";

import { TransactionWithCategory, UserProfile, trpc } from "@/app/_trpc/client";
import { formatCurrency } from "@/lib/utils";
import { groupTransactionsByDate } from "./utils";
import { format } from "date-fns";

import { Transaction } from "./transaction";

interface TransactionsClientProps {
  initialData: TransactionWithCategory[];
  profile: UserProfile;
  searchParams: { [key: string]: string | undefined };
}

export const TransactionsClient = ({
  initialData,
  searchParams,
  profile: profileInitialData,
}: TransactionsClientProps) => {
  const { from, to, type, categoryId } = searchParams;

  const { data: profile } = trpc.getProfile.useQuery(undefined, {
    initialData: profileInitialData,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const { data: transactions } = trpc.getTransactions.useQuery(
    { from, to, type, categoryId },
    {
      initialData: initialData,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  );

  const groupedTransactions = groupTransactionsByDate(transactions);

  return (
    <div className="space-y-16">
      {Object.keys(groupedTransactions).map((date) => {
        const transactions = groupedTransactions[date];
        const sum = transactions.reduce(
          (acc, transaction) =>
            acc + transaction.type === "INCOME"
              ? Number(transaction.amount)
              : -Number(transaction.amount),
          0,
        );

        return (
          <div className="space-y-4" key={date}>
            <div className="flex justify-between border-b p-4 text-sm font-bold uppercase text-brand">
              <span>{format(new Date(date), "EEE, MMM d")}</span>
              <span>{formatCurrency({ profile, amount: sum })}</span>
            </div>
            <div className="flex flex-col gap-4 overflow-hidden">
              {transactions
                .sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt))
                .map((transaction) => (
                  <Transaction
                    transaction={transaction}
                    key={transaction.id}
                    profile={profile}
                  />
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
