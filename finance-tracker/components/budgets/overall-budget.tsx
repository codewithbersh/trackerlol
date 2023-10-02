import { toTitleCase } from "@/lib/utils";
import { redirect } from "next/navigation";
import { getOverallBudget } from "@/actions/get-overall-budget";
import { NoOverallBudget } from "./no-overall-budget";
import { getTransactionsTotal } from "@/actions/get-transactions-total";
import { getCurrentUser } from "@/actions/get-current-user";
import { getStartDate, getTransactionDateRange } from "./utils";
import { differenceInCalendarDays } from "date-fns";

import { Progress } from "@/components/ui/progress";
import { EditOverallBudget } from "./edit-overall-budget-budget";

export const OverallBudget = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/login");
  }
  const budget = await getOverallBudget();

  if (!budget) {
    return <NoOverallBudget />;
  }

  const { from, to } = getTransactionDateRange(budget);
  const { _sum: total } = await getTransactionsTotal({
    userId: user.id,
    from,
    to,
  });

  const percentage = (Number(total.amount) / Number(budget.limit)) * 100;

  const daysLeft = differenceInCalendarDays(to, new Date());

  const spendingLimitLeft = Number(budget.limit) - Number(total.amount);

  return (
    <div className="flex flex-col gap-12 rounded-md border bg-background p-4 sm:p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2 leading-none">
          <h1 className="font-medium">{toTitleCase(budget.duration)}</h1>
          <p className="text-muted-foreground">{getStartDate(budget)}</p>
        </div>
        <EditOverallBudget
          budget={{ ...budget, limit: Number(budget.limit) }}
        />
      </div>

      <div className="flex  flex-col gap-3 leading-none text-muted-foreground">
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="hidden sm:inline">Current: </span>${" "}
            {Number(total.amount).toLocaleString("en-US")}
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
            {spendingLimitLeft > 0 ? "under" : "over"}
          </div>
          <div>
            {daysLeft} {daysLeft > 1 ? "days" : "day"} left
          </div>
        </div>
      </div>
    </div>
  );
};
