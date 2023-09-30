import { getBudgets } from "@/actions/get-budgets";

import { CategoryBudget } from "./category-budget";

export const CategoryBudgets = async () => {
  const { category } = await getBudgets();

  return (
    <div className="col-span-2 border-input border-t  rounded-md bg-accent/50 p-4 space-y-8">
      <div>
        <h1 className="font-bold">Category Budget</h1>
        <p className="text-muted-foreground text-sm">Budget overview</p>
      </div>
      <div className="flex gap-8 flex-wrap">
        {category.length === 0 && (
          <div className="py-2 text-muted-foreground text-sm">
            No budget found.
          </div>
        )}
        {category.map((budget) => (
          <CategoryBudget budget={budget} key={budget.id} />
        ))}
      </div>
    </div>
  );
};
