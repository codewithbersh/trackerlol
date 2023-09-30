import { getBudgets } from "@/actions/get-budgets";
import { getTransactions } from "@/actions/get-transactions";
import { cn, getBudgetTransactionRange } from "@/lib/utils";
import { CircularProgressbar } from "./circular-progressbar";
import { Shapes } from "lucide-react";

export const OverallBudget = async () => {
  const { overall } = await getBudgets();
  const budget = overall[0];
  const from =
    budget &&
    getBudgetTransactionRange({
      timeFrame: budget.timeFrame,
      range: "from",
      startDate: budget.startDate,
    });
  const to =
    budget &&
    getBudgetTransactionRange({
      timeFrame: budget.timeFrame,
      range: "to",
      startDate: budget.startDate,
    });

  const transactions = await getTransactions({
    slug: budget && budget.category?.slug,
    from,
    to,
    type: "EXPENSE",
  });

  const totalExpense = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  const value = budget && (totalExpense / budget.amount) * 100;

  const totalLeft = budget && budget.amount - totalExpense;

  return (
    <div className="col-span-full sm:col-span-1 rounded-md border-input border-t  bg-secondary/50 p-4 space-y-8">
      <div>
        <h1 className="font-bold">Overall Budget</h1>
        <p className="text-muted-foreground text-sm">Budget overview</p>
      </div>
      {!budget && (
        <div className="py-2 text-muted-foreground text-sm">
          No budget found.
        </div>
      )}
      {budget && (
        <div className="flex flex-col items-center gap-2 w-fit">
          <div className="relative max-w-[64px] max-h-[64px] aspect-square">
            <CircularProgressbar
              value={value > 100 ? 100 : value}
              className=""
              pathColor="#6366F1"
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full p-1.5 leading-none text-xl"
              style={{ backgroundColor: "#6366F1" }}
            >
              <Shapes className="w-4 h-4" />
            </div>
          </div>

          <div
            className={cn(
              "text-sm text-muted-foreground",
              value > 100 && "text-destructive"
            )}
          >
            $ {Math.abs(totalLeft).toLocaleString("us-EN")}{" "}
            {value > 100 ? "over" : "left"}
          </div>
        </div>
      )}
    </div>
  );
};
