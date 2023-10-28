"use client";

import { CategoriesByCount, trpc } from "@/app/_trpc/client";
import { Category } from "./category";

interface CategoriesClientProps {
  categories: CategoriesByCount;
  type: "EXPENSE" | "INCOME" | undefined;
}

export const CategoriesClient = ({
  categories: initialData,
  type,
}: CategoriesClientProps) => {
  const { data: categories } = trpc.category.getByCount.useQuery(
    { type },
    {
      initialData,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  );
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
