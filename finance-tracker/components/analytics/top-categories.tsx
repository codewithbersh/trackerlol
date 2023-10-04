"use client";

import { TopCategory } from "@/types/types";

import { TopCategoriesChart } from "./top-categories-chart";
import { useCategoryBudget } from "@/hooks/use-category-budget-modal";

import { Button } from "@/components/ui/button";

interface TopCategoriesProps {
  topCategories: TopCategory[];
}

export const TopCategories = ({ topCategories }: TopCategoriesProps) => {
  const { onOpen, setBudget } = useCategoryBudget();
  return (
    <div className="col-span-full space-y-8 rounded-md border p-4 md:col-span-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Top Categories</h1>
        <Button
          onClick={() => {
            onOpen();
            setBudget(null);
          }}
        >
          Add Category
        </Button>
      </div>
      <div className="flex flex-wrap gap-8">
        <TopCategoriesChart topCategories={topCategories} />
        <div className="flex w-full flex-1 flex-col gap-4">
          {topCategories.map((category) => (
            <div key={category.id} className="flex items-center gap-4">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <div className="leading-none">{category.name}</div>
              <div className="ml-auto font-semibold leading-none">
                {category.value.toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
