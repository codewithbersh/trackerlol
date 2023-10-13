import { getCategories } from "@/actions/get-categories";
import { validateCategoryParams } from "@/app/(dashboard)/transactions/_components/utils";
import { FilterByCategory } from "@/app/(dashboard)/transactions/_components/filter-by-category";
import { FilterReset } from "@/app/(dashboard)/transactions/_components/filter-reset";

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
