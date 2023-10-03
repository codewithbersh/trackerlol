import { CategoryBudgetWithLimitAsNumber } from "@/types/types";
import { getTransactionDateRange } from "./utils";
import { getTransactionsTotal } from "@/actions/get-transactions-total";
import { getCurrentUser } from "@/actions/get-current-user";
import { redirect } from "next/navigation";
import { differenceInCalendarDays } from "date-fns";

import { CategoryBudgetClient } from "./category-budget-client";

interface CategoryBudgetProps {
  budget: CategoryBudgetWithLimitAsNumber;
}

export const CategoryBudget = async ({ budget }: CategoryBudgetProps) => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/login");
  }
  const { from, to } = getTransactionDateRange(budget);
  const { _sum: total } = await getTransactionsTotal({
    userId: user.id,
    from,
    to,
    categoryId: budget.categoryId,
  });

  const percentage = (Number(total.amount) / Number(budget.limit)) * 100;

  const daysLeft = differenceInCalendarDays(to, new Date());

  const spendingLimitLeft = Number(budget.limit) - Number(total.amount);
  return (
    <CategoryBudgetClient
      budget={budget}
      percentage={percentage}
      daysLeft={daysLeft}
      spendingLimitLeft={spendingLimitLeft}
      total={Number(total.amount)}
      range={{ from, to }}
    />
  );
};
