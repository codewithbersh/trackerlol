import { getCategoriesBudget } from "@/actions/get-categories-budget";

import { NewCategoryBudget } from "./new-category-budget";

export const CategoriesBudget = async () => {
  const budgets = await getCategoriesBudget();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold leading-none">Categories</h1>
          <NewCategoryBudget />
        </div>
        <div className="flex gap-4 sm:gap-8">
          <div className="flex items-center gap-2 text-sm leading-none">
            <div className="text-muted-foreground">Over</div>
            <div className="grid  min-w-[20px] place-items-center rounded-[4px] bg-accent p-1 font-semibold">
              4
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm leading-none">
            <div className="text-muted-foreground">Over</div>
            <div className="grid  min-w-[20px] place-items-center rounded-[4px] bg-accent p-1 font-semibold">
              12
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};
