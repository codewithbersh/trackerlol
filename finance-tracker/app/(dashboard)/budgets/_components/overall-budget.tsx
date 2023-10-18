import { cn, formatCurrency, toTitleCase } from "@/lib/utils";
import { getTransactionsTotal } from "@/actions/get-transactions-total";
import { getBudgetDateRange, getStartDate } from "./utils";
import { differenceInCalendarDays } from "date-fns";
import { TriangleUpIcon } from "@radix-ui/react-icons";
import { OverallBudget as OverallBudgetType } from "@prisma/client";
import { getUserWithProfile } from "@/actions/get-user-with-profile";

import { Progress } from "@/components/ui/progress";
import { OverallBudgetAction } from "./overall-budget-action";
import { OverallViewTransactions } from "./overall-view-transactions";

interface OverallBudgetProps {
  budget: OverallBudgetType;
}

export const OverallBudget = async ({ budget }: OverallBudgetProps) => {
  const { from, to } = getBudgetDateRange({ budget });
  const { _sum: total } = await getTransactionsTotal({
    from,
    to,
  });
  const { profile } = await getUserWithProfile();

  const percentage = (Number(total.amount) / Number(budget.limit)) * 100;

  const daysLeft = differenceInCalendarDays(to, new Date()) + 1;

  const spendingLimitLeft = Number(budget.limit) - Number(total.amount);

  const totalAmount = formatCurrency({
    profile,
    amount: total.amount ? Number(total.amount) : 0,
  });
  const budgetLimit = formatCurrency({ profile, amount: Number(budget.limit) });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-semibold">Overall</h1>
      <div className="flex  flex-col gap-16 rounded-md border bg-background p-4 sm:p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2 leading-none">
            <h1 className="font-medium">{toTitleCase(budget.duration)}</h1>
            <p className="text-muted-foreground">{getStartDate(budget)}</p>
          </div>
          <OverallBudgetAction
            budget={{ ...budget, limit: Number(budget.limit) }}
          />
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
                  <span className="hidden sm:inline">Target: </span>{" "}
                  {budgetLimit}
                </div>
              </div>
              <Progress
                value={percentage > 100 ? 100 : percentage}
                className="h-3"
              />
              <div className="flex items-center justify-between text-sm">
                <div>
                  {formatCurrency({ profile, amount: spendingLimitLeft })}{" "}
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
    </div>
  );
};
