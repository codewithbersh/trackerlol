import { getTransactions } from "@/actions/get-transactions";
import { cn, getBudgetTransactionRange } from "@/lib/utils";
import { BudgetWithCategory } from "@/types/types";
import { CircularProgressbar } from "./circular-progressbar";

interface CategoryBudgetProps {
  budget: BudgetWithCategory;
}

export const CategoryBudget = async ({ budget }: CategoryBudgetProps) => {
  if (!budget.category) return null;

  const from = getBudgetTransactionRange({
    timeFrame: budget.timeFrame,
    range: "from",
    startDate: budget.startDate,
  });
  const to = getBudgetTransactionRange({
    timeFrame: budget.timeFrame,
    range: "to",
    startDate: budget.startDate,
  });

  const transactions = await getTransactions({
    slug: budget.category.slug,
    from,
    to,
    type: "EXPENSE",
  });

  const totalExpense = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  const value = (totalExpense / budget.amount) * 100;

  const totalLeft = budget.amount - totalExpense;
  return (
    <div className="flex items-center flex-col justify-center gap-2">
      <div className="relative max-w-[64px] max-h-[64px] aspect-square">
        <CircularProgressbar
          value={value > 100 ? 100 : value}
          className=""
          pathColor={budget.category.color}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full p-1.5 leading-none text-xl"
          style={{ backgroundColor: budget.category.color }}
        >
          {budget.category.emoji}
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
  );
};
