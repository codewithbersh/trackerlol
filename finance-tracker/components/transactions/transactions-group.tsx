"use client";

import { GroupedTransactionsType } from "@/types/types";

import { TransactionsGroupItem } from "./transactions-group-item";

interface TransactionsGroupProps {
  group: GroupedTransactionsType;
}

export const TransactionsGroup = ({
  group: { transactions, date, sum },
}: TransactionsGroupProps) => {
  const sortedTransactions = transactions.sort(
    (a, b) => Number(b.updatedAt) - Number(a.updatedAt),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between border-b p-4 text-sm font-bold uppercase">
        <span>{date}</span>
        <span>$ {sum.toLocaleString("en-US")}</span>
      </div>
      <div className="flex flex-col gap-4 overflow-hidden">
        {sortedTransactions.map((transaction) => (
          <TransactionsGroupItem
            transaction={transaction}
            key={transaction.id}
          />
        ))}
      </div>
    </div>
  );
};
