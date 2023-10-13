import { CategoryBudgetWithLimitAsNumber } from "@/types/types";
import { getTransactionsTotal } from "@/actions/get-transactions-total";
import { cn, greenToRed } from "@/lib/utils";

import { CircularProgressBar } from "@/components/ui/circular-progress-bar";
import { ActionTooltip } from "@/components/ui/action-tooltip";
import { getBudgetDateRange } from "@/app/(dashboard)/budgets/_components/utils";

interface BudgetsCategoryProps {
  budget: CategoryBudgetWithLimitAsNumber;
}

export const BudgetsCategory = async ({ budget }: BudgetsCategoryProps) => {
  const { from, to } = getBudgetDateRange({ budget });
  const { _sum: total } = await getTransactionsTotal({
    from,
    to,
    categoryId: budget.categoryId,
  });

  const percentage = (Number(total.amount) / Number(budget.limit)) * 100;

  const spendingLimitLeft = Number(budget.limit) - Number(total.amount);
  return (
    <ActionTooltip label={budget.category.title}>
      <div className="flex shrink-0 flex-col items-center justify-center gap-4">
        <div className="relative aspect-square max-h-[64px] max-w-[64px]">
          <CircularProgressBar
            value={percentage > 100 ? 100 : percentage}
            className=""
            pathColor={greenToRed(percentage > 100 ? 100 : percentage)}
          />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-1.5 text-xl leading-none"
            style={{ backgroundColor: budget.category.color }}
          >
            {budget.category.emoji}
          </div>
        </div>
        <div
          className={cn(
            "flex flex-col items-center text-sm text-muted-foreground",
            percentage > 100 && "text-red-400",
          )}
        >
          <span>${Math.abs(spendingLimitLeft).toLocaleString("us-EN")}</span>
          <span>{percentage > 100 ? "over" : "left"}</span>
        </div>
      </div>
    </ActionTooltip>
  );
};
