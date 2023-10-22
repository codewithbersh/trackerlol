"use client";

import { GroupedTransactionsType } from "@/types/types";
import { Profile } from "@prisma/client";
import { formatCurrency } from "@/lib/utils";

import { TransactionsGroupItem } from "./transactions-group-item";

interface TransactionsGroupProps {
  group: GroupedTransactionsType;
  profile: Profile | null;
}

export const TransactionsGroup = ({
  group: { transactions, date, sum },
  profile,
}: TransactionsGroupProps) => {
  const sortedTransactions = transactions.sort(
    (a, b) => Number(b.updatedAt) - Number(a.updatedAt),
  );

  const formattedSum = formatCurrency({ profile, amount: sum });

  return (
    <div className="space-y-4">
      <div className="text-brand flex justify-between border-b p-4 text-sm font-bold uppercase">
        <span>{date}</span>
        <span>{formattedSum}</span>
      </div>
      <div className="flex flex-col gap-4 overflow-hidden">
        {sortedTransactions.map((transaction) => (
          <TransactionsGroupItem
            transaction={transaction}
            key={transaction.id}
            profile={profile}
          />
        ))}
      </div>
    </div>
  );
};
