import { getCategoriesByCount } from "@/actions/get-categories-by-count";
import { TransactionType } from "@prisma/client";

import { Category } from "./category";

interface CategoriesProps {
  type: TransactionType | undefined;
}

export const Categories = async ({ type }: CategoriesProps) => {
  const categories = await getCategoriesByCount({ type });

  if (!categories || categories.length === 0) {
    return (
      <div className="grid w-full place-items-center py-12 text-sm text-muted-foreground">
        No categories.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      {categories.map((category) => (
        <Category
          category={category.category}
          count={category.count}
          key={category.category.id}
        />
      ))}
    </div>
  );
};
