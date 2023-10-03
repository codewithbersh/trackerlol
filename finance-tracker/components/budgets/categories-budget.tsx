import { getCategoriesBudget } from "@/actions/get-categories-budget";

import { NewCategoryBudget } from "./new-category-budget";
import { CategoryBudget } from "./category-budget";

export const CategoriesBudget = async () => {
  const budgets = await getCategoriesBudget();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold leading-none">Categories</h1>
        <NewCategoryBudget />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {budgets.map((budget) => (
          <CategoryBudget
            key={budget.id}
            budget={{ ...budget, limit: Number(budget.limit) }}
          />
        ))}
      </div>
    </div>
  );
};
