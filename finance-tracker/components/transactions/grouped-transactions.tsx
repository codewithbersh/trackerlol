"use client";

import { parseISO, format } from "date-fns";
import { GroupedTransactions as GroupedTransactionsType } from "@/lib/utils";
import { useTransactionModal } from "@/hooks/use-transaction-modal";

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
      return (
        acc +
        (transaction.type === "INCOME"
          ? Number(transaction.amount)
          : -1 * Number(transaction.amount))
      );
    }, 0)
    .toLocaleString("en-US");

  return (
    <div className="space-y-4">
      <div className="flex justify-between border-b p-4 text-sm font-bold uppercase">
        <span>{date}</span>
        <span>$ {sum}</span>
      </div>
      <div className="flex flex-col gap-4 overflow-hidden">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex cursor-pointer items-center justify-between rounded-md hover:bg-accent/50"
            onClick={() => {
              setTransaction(transaction);
              onOpen();
            }}
          >
            <div className="flex w-full items-center justify-between gap-4 px-4 py-2">
              <div className="flex items-center gap-4">
                <div
                  className="grid h-10 w-10 place-items-center rounded-md"
                  style={{ backgroundColor: transaction.category.color }}
                >
                  <span className="text-xl leading-none">
                    {transaction.category.emoji}
                  </span>
                </div>

                <div className="flex flex-col gap-2 font-medium leading-none">
                  <div className="font-bold">{transaction.category.title}</div>
                  <div className="text-muted-foreground">
                    {transaction.note}
                  </div>
                </div>
              </div>

              <div className="ml-auto shrink-0">
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
