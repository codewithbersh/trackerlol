"use client";

import { getBudgetDateRange } from "./utils";
import { differenceInCalendarDays } from "date-fns";
import { CategoriesBudgets, UserProfile, trpc } from "@/app/_trpc/client";
import { cn, formatCurrency, greenToRed, toTitleCase } from "@/lib/utils";
import { TriangleUpIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { getStartDate } from "./utils";
import { useCategoryBudget } from "@/hooks/use-category-budget-modal";
import { useRouter } from "next/navigation";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface CategoriesItemProps {
  budget: CategoriesBudgets[number];
  profile: UserProfile | undefined;
}

export const CategoriesItem = ({ budget, profile }: CategoriesItemProps) => {
  const router = useRouter();
  const { setBudget, onOpen } = useCategoryBudget();
  const { from, to } = getBudgetDateRange({ budget });
  const {
    data: total,
    isLoading,
    isFetching,
  } = trpc.transaction.getTotal.useQuery(
    {
      from,
      to,
      categoryId: budget.categoryId,
    },
    {
      staleTime: Infinity,
    },
  );

  const percentage = ((total ? total : 0) / budget.limit) * 100;
  const daysLeft = differenceInCalendarDays(to, new Date()) + 1;
  const spendingLimitLeft = budget.limit - (total ?? 0);

  return (
    <div
      className="flex cursor-pointer flex-col rounded-sm border p-4 hover:bg-accent/25"
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

      <div className="flex flex-1 flex-col gap-1 pt-8 leading-none text-muted-foreground">
        <div className="flex items-center justify-between text-sm font-medium text-primary">
          <div className="flex items-center gap-1">
            <span className="hidden sm:inline">Current: </span>
            {isLoading || isFetching ? (
              <Skeleton className="inline-block h-5 w-12 rounded-sm" />
            ) : (
              formatCurrency({ profile, amount: total ?? 0 })
            )}
          </div>
          <div>
            <span className="hidden sm:inline">Target: </span>
            {formatCurrency({ profile, amount: Number(budget.limit) })}
          </div>
        </div>
        <Progress
          value={percentage > 100 ? 100 : percentage}
          className="h-2"
          indicatorBgColor={greenToRed(percentage > 100 ? 100 : percentage)}
        />
        <div className="flex items-center justify-between text-sm">
          <div className={cn(percentage >= 100 && "text-red-500")}>
            {formatCurrency({
              profile,
              amount: spendingLimitLeft,
              signDisplay: "never",
            })}{" "}
            {spendingLimitLeft >= 0 ? "under" : "over"}
          </div>
          <div>
            {daysLeft} {daysLeft > 1 ? "days" : "day"} left
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center pt-2">
        <Button
          variant="link"
          className="h-fit w-fit p-0 text-muted-foreground hover:text-primary"
          onClick={(e) => {
            e.stopPropagation();
            router.push(
              `/transactions?categoryId=${budget.category.id}&from=${format(
                from,
                "yyyy-MM-dd",
              )}&to=${format(to, "yyyy-MM-dd")}`,
            );
          }}
        >
          View Transactions
        </Button>
      </div>
    </div>
  );
};
