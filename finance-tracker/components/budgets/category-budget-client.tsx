"use client";

import { cn, toTitleCase } from "@/lib/utils";
import { CategoryBudgetWithLimitAsNumber } from "@/types/types";
import { getStartDate } from "./utils";
import { TriangleUpIcon } from "@radix-ui/react-icons";
import { useCategoryBudget } from "@/hooks/use-category-budget-modal";

import { Progress } from "@/components/ui/progress";

interface CategoryBudgetClientProps {
  budget: CategoryBudgetWithLimitAsNumber;
  percentage: number;
  total: number;
  spendingLimitLeft: number;
  daysLeft: number;
}

export const CategoryBudgetClient = ({
  budget,
  percentage,
  total,
  spendingLimitLeft,
  daysLeft,
}: CategoryBudgetClientProps) => {
  const { onOpen, setBudget } = useCategoryBudget();
  return (
    <div
      className="flex cursor-pointer flex-col gap-8 rounded-sm border p-4 hover:bg-accent/25"
      onClick={() => {
        setBudget(budget);
        onOpen();
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-fit rounded-sm p-2 text-xl leading-none"
            style={{ backgroundColor: budget.category.color }}
          >
            <div>{budget.category.emoji}</div>
          </div>
          <div className="flex flex-col gap-1 text-sm font-medium leading-none">
            <div className="font-bold">
              {toTitleCase(budget.category.title)}
            </div>
            <div className="text-muted-foreground">{getStartDate(budget)}</div>
          </div>
        </div>

        <div
          className={cn(
            "flex items-center justify-end gap-1",
            percentage > 100 ? "text-red-500" : "text-green-500",
            percentage === 100 && "text-muted-foreground",
          )}
        >
          <TriangleUpIcon className="h-4 w-4" />
          <div className="font-semibold leading-none">
            {Math.abs(100 - percentage).toFixed(0)}%
          </div>
        </div>
      </div>

      <div className="flex  flex-1 flex-col gap-1 leading-none text-muted-foreground">
        <div className="flex items-center justify-between text-sm font-medium text-primary">
          <div>
            <span className="hidden sm:inline">Current: </span>${" "}
            {total.toLocaleString("en-US")}
          </div>
          <div>
            <span className="hidden sm:inline">Target: </span>${" "}
            {Number(budget.limit).toLocaleString("en-US")}
          </div>
        </div>
        <Progress value={percentage > 100 ? 100 : percentage} className="h-2" />
        <div className="flex items-center justify-between text-sm">
          <div>
            $ {Math.abs(spendingLimitLeft).toLocaleString("en-US")}{" "}
            {spendingLimitLeft >= 0 ? "under" : "over"}
          </div>
          <div>
            {daysLeft} {daysLeft > 1 ? "days" : "day"} left
          </div>
        </div>
      </div>
    </div>
  );
};
