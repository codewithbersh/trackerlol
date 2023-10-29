"use client";

import {
  CategoriesBudgets as CategoriesBudgetsType,
  UserProfile,
  trpc,
} from "@/app/_trpc/client";
import { CategoriesItem } from "./categories-item";

interface CategoriesBudgetsProps {
  profile: UserProfile;
  initialData: CategoriesBudgetsType;
}

export const CategoriesBudgets = ({
  profile,
  initialData,
}: CategoriesBudgetsProps) => {
  const { data: budgets } = trpc.budget.categories.getAll.useQuery(undefined, {
    staleTime: Infinity,
    initialData,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

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
        <CategoriesItem budget={budget} profile={profile} key={budget.id} />
      ))}
    </div>
  );
};
