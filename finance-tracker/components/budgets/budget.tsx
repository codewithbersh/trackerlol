import { getTransactions } from "@/actions/get-transactions";
import { BudgetWithCategory } from "@/types/types";
import { calculateDaysLeft, cn, getBudgetTransactionRange } from "@/lib/utils";
import { TriangleUpIcon } from "@radix-ui/react-icons";
import { CircleDashed } from "lucide-react";

interface BudgetProps {
  budget: BudgetWithCategory;
}

export const Budget = async ({ budget }: BudgetProps) => {
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
    slug: budget.category?.slug,
    from,
    to,
  });

  const totalExpense = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  const isOver = totalExpense > budget.amount;
  const totalLeft = `${isOver ? "-" : ""} $ ${Math.abs(
    budget.amount - totalExpense
  ).toLocaleString("en-US")}`;

  const daysLeft = calculateDaysLeft(budget.timeFrame, budget.startDate);

  return (
    <div className="w-full rounded-full px-4 py-2 hover:bg-neutral-800/50 bg-neutral-800 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        {budget.category ? (
          <div
            className="rounded-full text-xl leading-none p-2 w-fit"
            style={{ backgroundColor: budget.category.color }}
          >
            {budget.category.emoji}
          </div>
        ) : (
          <CircleDashed className="w-9 h-9" strokeWidth={1} />
        )}
        <div className="text-sm font-medium flex flex-col gap-1 leading-none">
          {budget.category ? (
            <span>{budget.category.title}</span>
          ) : (
            <span>Overall</span>
          )}
          <span className="text-muted-foreground">
            {daysLeft} {daysLeft > 1 ? "days" : "day"} left
          </span>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <span
          className={cn(
            "leading-none font-medium",
            isOver && "text-destructive"
          )}
        >
          {totalLeft}
        </span>
        <TriangleUpIcon
          className={cn(
            isOver ? "text-destructive rotate-180" : "text-emerald-500"
          )}
        />
      </div>
    </div>
  );
};
