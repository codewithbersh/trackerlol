"use client";

import { useTransactionModal } from "@/hooks/use-transaction-modal";
import { TransactionWithCategoryWithAmountAsNumber } from "@/types/types";

interface TransactionsGroupItem {
  transaction: TransactionWithCategoryWithAmountAsNumber;
}

export const TransactionsGroupItem = ({
  transaction,
}: TransactionsGroupItem) => {
  const { onOpen, setTransaction } = useTransactionModal();

  return (
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
            {transaction.note.length > 0 ? (
              <div className="text-muted-foreground">{transaction.note}</div>
            ) : (
              <div className="text-muted-foreground/75">Empty</div>
            )}
          </div>
        </div>

        <div className="ml-auto shrink-0">
          <span>{transaction.type === "EXPENSE" ? "-" : ""} $</span>{" "}
          {Number(transaction.amount).toLocaleString("en-US")}
        </div>
      </div>
    </div>
  );
};
