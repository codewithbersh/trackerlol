import { cn } from "@/lib/utils";
import { TransactionWithCategoryWithAmountAsNumber } from "@/types/types";
import {
  ArrowDownRight,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface NetOverallProps {
  transactions: TransactionWithCategoryWithAmountAsNumber[];
}

export const NetOverall = ({ transactions }: NetOverallProps) => {
  const expense = transactions.filter(
    (transaction) => transaction.type === "EXPENSE"
  );
  const totalExpense = expense.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const income = transactions.filter(
    (transaction) => transaction.type === "INCOME"
  );
  const totalIncome = income.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const netOverall = totalIncome - totalExpense;

  const summary = [
    {
      id: "income",
      title: "Total Income",
      value: totalIncome,
      icon: ArrowUpRight,
    },
    {
      id: "expense",

      title: "Total Expense",
      value: totalExpense,
      icon: ArrowDownRight,
    },
    {
      id: "overall",
      title: "Net Overall",
      value: netOverall,
      icon: TrendingDown,
    },
  ];

  return (
    <>
      {/* {summary.map((item) => (
        <div
          className="border-input border rounded-md bg-accent/50 p-4 space-y-4"
          key={item.value}
        >
          <div className="flex justify-between w-full">
            <p className="text-muted-foreground">{item.title}</p>
            <div
              className={cn(
                "p-1 rounded-full",
                item.id === "expense"
                  ? "bg-destructive/25 text-destructive"
                  : item.id === "income"
                  ? "bg-green-500/25 text-green-500"
                  : item.id === "overall" && item.value < 0
                  ? "bg-destructive/25 text-destructive"
                  : "bg-green-500/25 text-green-500"
              )}
            >
              <item.icon className="w-4 h-4" />
            </div>
          </div>
          <h1
            className={cn(
              "text-2xl font-bold tracking-wide",
              item.value < 0 && "text-destructive"
            )}
          >
            {item.value < 0 ? "- $" : "$"}{" "}
            {Math.abs(item.value).toLocaleString("en-US")}
          </h1>
        </div>
      ))} */}

      <div className="border-input border-t rounded-md bg-accent/50 p-4 space-y-4 col-span-1">
        <div className="flex justify-between w-full">
          <p className="text-muted-foreground">Total Income</p>
          <div
            className={cn("p-1 rounded-full bg-green-500/25 text-green-500")}
          >
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        <h1 className={cn("text-2xl font-bold tracking-wide")}>
          $ {Math.abs(totalIncome).toLocaleString("en-US")}
        </h1>
      </div>

      <div className="border-input border-t  rounded-md bg-accent/50 p-4 space-y-4 col-span-1">
        <div className="flex justify-between w-full">
          <p className="text-muted-foreground">Total Expense</p>
          <div
            className={cn(
              "p-1 rounded-full bg-destructive/25 text-destructive"
            )}
          >
            <ArrowDownRight className="w-4 h-4" />
          </div>
        </div>
        <h1 className={cn("text-2xl font-bold tracking-wide")}>
          $ {Math.abs(totalExpense).toLocaleString("en-US")}
        </h1>
      </div>

      <div className="border-input border-t  rounded-md bg-accent/50 p-4 space-y-4 col-span-2 sm:col-span-1">
        <div className="flex justify-between w-full">
          <p className="text-muted-foreground">Net Overall</p>
          <div
            className={cn(
              "p-1 rounded-full",
              netOverall >= 0
                ? "bg-green-400/25 text-green-400"
                : "bg-destructive/25 text-destructive"
            )}
          >
            {netOverall >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
          </div>
        </div>
        <h1 className={cn("text-2xl font-bold tracking-wide")}>
          {netOverall >= 0 ? "$" : "-$"}{" "}
          {Math.abs(netOverall).toLocaleString("en-US")}
        </h1>
      </div>
    </>
  );
};
