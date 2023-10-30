"use client";

import {
  OverallBudget as OverallBudgetType,
  UserProfile,
  trpc,
} from "@/app/_trpc/client";
import { AddOverallBudget } from "@/components/add-overall-budget";
import { Spinner } from "@/components/spinner";
import { cn, formatCurrency, greenToRed, toTitleCase } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import { getStartDate } from "./utils";
import { OverallBudgetAction } from "./overall-budget-action";
import { Progress } from "@/components/ui/progress";
import { TriangleUpIcon } from "@radix-ui/react-icons";
import { OverallViewTransactions } from "./overall-view-transactions";

export const OverallBudget = () => {
  const { data: profile } = trpc.profile.get.useQuery();
  const { data: overallBudget, isLoading } = trpc.budget.overall.get.useQuery(
    undefined,
    {
      staleTime: Infinity,
    },
  );

  if (isLoading) {
    return <Spinner className="py-8" variant="large" />;
  }

  if (!overallBudget) {
    return <AddOverallBudget />;
  }

  const {
    budget,
    total,
    range: { from, to },
  } = overallBudget;

  const percentage = (total / budget.limit) * 100;

  const daysLeft = differenceInCalendarDays(to, new Date()) + 1;

  const spendingLimitLeft = budget.limit - total;

  const totalAmount = formatCurrency({
    profile,
    amount: total,
  });
  const budgetLimit = formatCurrency({ profile, amount: budget.limit });

  return (
    <div className="flex  flex-col gap-16 rounded-md border bg-background p-4 sm:p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2 leading-none">
          <h1 className="font-medium">{toTitleCase(budget.duration)}</h1>
          <p className="text-muted-foreground">{getStartDate(budget)}</p>
        </div>
        <OverallBudgetAction budget={budget} />
      </div>

      <div>
        <div className="flex w-full gap-4 sm:gap-8 md:gap-16">
          <div className="flex  flex-1 flex-col gap-3 leading-none text-muted-foreground">
            <div className="flex items-center justify-between text-sm font-medium text-primary">
              <div>
                <span className="hidden sm:inline">Current: </span>
                {totalAmount}
              </div>
              <div>
                <span className="hidden sm:inline">Target: </span> {budgetLimit}
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

          <div
            className={cn(
              "flex min-w-[96px] items-center justify-end gap-2",
              percentage > 100 ? "text-red-500" : "text-green-500",
              percentage === 100 && "text-muted-foreground",
            )}
          >
            <TriangleUpIcon className="h-6 w-6" />
            <div className="text-2xl font-semibold leading-none">
              {Math.abs(100 - percentage).toFixed(0)}%
            </div>
          </div>
        </div>
        <OverallViewTransactions range={{ from, to }} />
      </div>
    </div>
  );
};
