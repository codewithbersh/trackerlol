import { CategoryBudgetWithLimitAsNumber } from "@/types/types";
import { getBudgetDateRange } from "./utils";
import { getTransactionsTotal } from "@/actions/get-transactions-total";
import { differenceInCalendarDays } from "date-fns";
import { getUserWithProfile } from "@/actions/get-user-with-profile";

import { CategoriesItemClient } from "./categories-item-client";

interface CategoriesItemProps {
  budget: CategoryBudgetWithLimitAsNumber;
}

export const CategoriesItem = async ({ budget }: CategoriesItemProps) => {
  const { from, to } = getBudgetDateRange({ budget });
  const { _sum: total } = await getTransactionsTotal({
    from,
    to,
    categoryId: budget.categoryId,
  });
  const { profile } = await getUserWithProfile();

  const percentage = (Number(total.amount) / Number(budget.limit)) * 100;

  const daysLeft = differenceInCalendarDays(to, new Date()) + 1;

  const spendingLimitLeft = Number(budget.limit) - Number(total.amount);
  return (
    <CategoriesItemClient
      budget={budget}
      percentage={percentage}
      daysLeft={daysLeft}
      spendingLimitLeft={spendingLimitLeft}
      total={Number(total.amount)}
      range={{ from, to }}
      profile={profile}
    />
  );
};
