"use client";

import { parseISO, format } from "date-fns";
import { GroupedTransactions as GroupedTransactionsType } from "@/lib/utils";
import { useTransactionModal } from "@/hooks/use-transaction-modal";

import { CategoryBadge } from "@/components/category-badge";

interface GroupedTransactionsProps {
  group: GroupedTransactionsType;
}

export const GroupedTransactions = ({
  group: { date: initialDate, transactions },
}: GroupedTransactionsProps) => {
  const { onOpen, setTransaction } = useTransactionModal();
  const date = format(parseISO(initialDate), "EEE, MMM d");
  const sum = transactions
    .reduce((acc, transaction) => {
      return acc + Number(transaction.amount);
    }, 0)
    .toLocaleString("en-US");

  return (
    <div className="space-y-2 text-sm leading-none sm:text-base">
      <div className="flex justify-between px-4">
        <small className="text-muted-foreground">{date}</small>
        <small className="text-muted-foreground">$ {sum}</small>
      </div>
      <div className="flex flex-col gap-4 overflow-hidden">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-accent/75 rounded-full flex items-center justify-between px-4 py-2 hover:bg-accent/50 cursor-pointer"
            onClick={() => {
              setTransaction(transaction);
              onOpen();
            }}
          >
            <div className="flex gap-4 w-full items-center justify-between">
              <CategoryBadge
                backgroundColor={transaction.category.color}
                emoji={transaction.category.emoji}
                title={transaction.category.title}
              />
              <div className="text-muted-foreground truncate leading-tight">
                {transaction.note}
              </div>

              <div className="text-foreground/80 font-bold ml-auto shrink-0">
                <span>{transaction.type === "EXPENSE" ? "-" : ""} $</span>{" "}
                {Number(transaction.amount).toLocaleString("en-US")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
