"use client";

import { trpc } from "@/app/_trpc/client";
import { CategoriesItem } from "./categories-item";
import { Spinner } from "@/components/spinner";

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
    return <Spinner className="py-12 md:py-24" />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {budgets?.map((budget) => (
        <CategoriesItem budget={budget} profile={profile} key={budget.id} />
      ))}
    </div>
  );
};
