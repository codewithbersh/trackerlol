import { getCategories } from "@/actions/get-categories";

import { FilterByCategory } from "@/components/transactions/filter-by-category";
import { validateCategoryParams } from "@/components/transactions/utils";
import { FilterReset } from "@/components/transactions/filter-reset";

interface FiltersProps {
  searchParams: { [key: string]: string | undefined };
}

export const Filters = async ({ searchParams }: FiltersProps) => {
  const { categories, income, expense } = await getCategories();
  const category = validateCategoryParams({
    categories,
    params: searchParams.category,
  });
  return (
    <div className="flex w-fit gap-4">
      <FilterByCategory category={category} income={income} expense={expense} />
      {searchParams.category && <FilterReset href="/receipts" />}
    </div>
  );
};
