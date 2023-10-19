import { getCategoriesBudget } from "@/actions/get-categories-budget";

import { CategoriesItem } from "./categories-item";

export const Categories = async () => {
  const budgets = await getCategoriesBudget();

  if (budgets.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        No category budgets.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {budgets.map((budget) => (
        <CategoriesItem
          key={budget.id}
          budget={{ ...budget, limit: Number(budget.limit) }}
        />
      ))}
    </div>
  );
};
