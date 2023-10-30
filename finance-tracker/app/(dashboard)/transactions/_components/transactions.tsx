"use client";

import { TransactionWithCategory, UserProfile, trpc } from "@/app/_trpc/client";
import { formatCurrency } from "@/lib/utils";
import { groupTransactionsByDate } from "./utils";
import { format } from "date-fns";

import { Transaction } from "./transaction";

interface TransactionsClientProps {
  searchParams: { [key: string]: string | undefined };
}

export const Transactions = ({ searchParams }: TransactionsClientProps) => {
  const { from, to, type, categoryId } = searchParams;

  const { data: profile } = trpc.profile.get.useQuery(undefined, {
    staleTime: Infinity,
  });

  const { data: transactions } = trpc.transaction.getAll.useQuery(
    { from, to, type, categoryId },
    {
      staleTime: Infinity,
    },
  );

  if (!transactions || !profile) return null;

  const groupedTransactions = groupTransactionsByDate(transactions);

  if (transactions.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        No transactions.
      </div>
    );
  }

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
