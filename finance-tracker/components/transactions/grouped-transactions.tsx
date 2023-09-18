import Link from "next/link";
import { parseISO, format } from "date-fns";
import { GroupedTransactions as GroupedTransactionsType } from "@/lib/utils";

interface GroupedTransactionsProps {
  group: GroupedTransactionsType;
}

export const GroupedTransactions = ({
  group: { date: initialDate, transactions },
}: GroupedTransactionsProps) => {
  const date = format(parseISO(initialDate), "EEE, MMM d");
  const sum = transactions
    .reduce((acc, transaction) => {
      return acc + Number(transaction.amount);
    }, 0)
    .toLocaleString("en-US");

  return (
    <div className="space-y-2 text-sm leading-none sm:text-base">
      <div className="flex justify-between px-2">
        <small className="text-muted-foreground">{date}</small>
        <small className="text-muted-foreground">$ {sum}</small>
      </div>
      <div className="flex flex-col gap-4 overflow-hidden">
        {transactions.map((transaction) => (
          <Link
            href={`/transactions/${transaction.id}`}
            key={transaction.id}
            className="bg-accent rounded-md flex items-center justify-between px-4 py-2 hover:bg-accent/50 cursor-pointer"
            scroll={false}
          >
            <div className="flex gap-4 w-full items-center justify-between">
              <div
                className="flex items-center gap-2 text-neutral-950 rounded-sm font-medium px-2 py-1 leading-none"
                style={{ backgroundColor: transaction.category.color }}
              >
                <span>{transaction.category.emoji}</span>
                <span>{transaction.category.title}</span>
              </div>
              <div className="text-muted-foreground truncate leading-none">
                {transaction.note}
              </div>

              <div className="text-primary ml-auto shrink-0">
                $ {Number(transaction.amount).toLocaleString("en-US")}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
