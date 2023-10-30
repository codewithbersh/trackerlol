"use client";

import { cn, formatCurrency, greenToRed } from "@/lib/utils";
import { CategoriesBudgets, trpc } from "@/app/_trpc/client";
import { getBudgetDateRange } from "@/app/(dashboard)/budgets/_components/utils";

import { CircularProgressBar } from "@/components/ui/circular-progress-bar";
import { ActionTooltip } from "@/components/ui/action-tooltip";

interface BudgetsCategoryProps {
  budget: CategoriesBudgets[number];
}

export const BudgetsCategory = ({ budget }: BudgetsCategoryProps) => {
  const { from, to } = getBudgetDateRange({ budget });
  const { data: total } = trpc.transaction.getTotal.useQuery(
    {
      from,
      to,
      categoryId: budget.categoryId,
    },
    {
      staleTime: Infinity,
    },
  );
  const { data: profile } = trpc.profile.get.useQuery();

  const percentage = ((total ?? 0) / Number(budget.limit)) * 100;

  const spendingLimitLeft = Number(budget.limit) - (total ?? 0);
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
          <span>
            {formatCurrency({
              profile,
              amount: spendingLimitLeft,
              signDisplay: "never",
            })}{" "}
          </span>
          <span>{percentage > 100 ? "over" : "left"}</span>
        </div>
      </div>
    </ActionTooltip>
  );
};
