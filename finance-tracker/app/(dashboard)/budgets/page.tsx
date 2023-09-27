import { getBudgets } from "@/actions/get-budgets";

import { BudgetButton } from "@/components/budget-button";
import { Budgets } from "@/components/budgets/budgets";

const BudgetsPage = async () => {
  const { category, overall } = await getBudgets();

  return (
    <div className="flex flex-col gap-8 py-24">
      <BudgetButton />
      <div className="mt-8 space-y-16">
        <Budgets budgets={overall} type="Overall" />
        <Budgets budgets={category} type="Category" />
      </div>
    </div>
  );
};

export default BudgetsPage;
