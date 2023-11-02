"use client";

import { trpc } from "@/app/_trpc/client";

import { Spinner } from "@/components/spinner";
import { CategoriesItem } from "./categories-item";

export const CategoriesBudgets = () => {
  const { data: profile } = trpc.profile.get.useQuery(undefined, {
    staleTime: Infinity,
  });
  const { data: budgets, isLoading } = trpc.budget.categories.getAll.useQuery(
    undefined,
    {
      staleTime: Infinity,
    },
  );

  if (isLoading) {
    return <Spinner className="py-12 md:py-24" variant="large" />;
  }

  if (!budgets || budgets.length === 0) {
    return (
      <div className="grid place-items-center py-6 text-sm text-muted-foreground md:py-12">
        <span>No category budgets.</span>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {budgets?.map((budget) => (
        <CategoriesItem budget={budget} profile={profile} key={budget.id} />
      ))}
    </div>
  );
};
