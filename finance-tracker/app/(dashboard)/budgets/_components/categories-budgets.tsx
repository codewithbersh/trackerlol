"use client";

import { trpc } from "@/app/_trpc/client";
import { CategoriesItem } from "./categories-item";

export const CategoriesBudgets = () => {
  const { data: profile } = trpc.profile.get.useQuery();
  const { data: budgets, isLoading } = trpc.budget.categories.getAll.useQuery(
    undefined,
    {
      staleTime: Infinity,
    },
  );

  if (budgets?.length === 0 || !budgets) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        No category budgets.
      </div>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {budgets.map((budget) => (
        <CategoriesItem budget={budget} profile={profile} key={budget.id} />
      ))}
    </div>
  );
};
