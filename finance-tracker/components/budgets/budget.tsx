import { getTransactions } from "@/actions/get-transactions";
import { BudgetWithCategory } from "@/types/types";
import { getBudgetTransactionRange } from "@/lib/utils";
import { BudgetClient } from "./budget-client";

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

  return <BudgetClient transactions={transactions} budget={budget} />;
};
