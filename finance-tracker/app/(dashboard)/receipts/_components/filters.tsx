"use client";

import { getCategories } from "@/actions/get-categories";
import { validateCategoryParams } from "@/app/(dashboard)/transactions/_components/utils";
import { FilterByCategory } from "@/app/(dashboard)/transactions/_components/filter-by-category";
import { FilterReset } from "@/app/(dashboard)/transactions/_components/filter-reset";
import { trpc } from "@/app/_trpc/client";

interface FiltersProps {
  categoryId: string | undefined;
}

export const Filters = ({ categoryId }: FiltersProps) => {
  const { data: categories } = trpc.category.get.useQuery(undefined, {
    staleTime: Infinity,
  });

  if (!categories) return null;

  const category = categories?.find((category) => category.id === categoryId);
  const income = categories?.filter((category) => category.type === "INCOME");
  const expense = categories?.filter((category) => category.type === "EXPENSE");

  return (
    <div className="flex w-fit gap-4">
      <FilterByCategory category={category} income={income} expense={expense} />
      {categoryId && <FilterReset href="/receipts" />}
    </div>
  );
};
