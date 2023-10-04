import { FilterByType } from "./filter-by-type";
import { ValidateSearchParamsType } from "./utils";
import { FilterByCategory } from "./filter-by-category";
import { FilterByDate } from "./filter-by-date";
import { FilterReset } from "./filter-reset";

interface FiltersInDesktopProps {
  filters: ValidateSearchParamsType;
}

export const FiltersInDesktop = async ({
  filters: { filters, categories, hasValidFilter },
}: FiltersInDesktopProps) => {
  return (
    <div className="hidden w-fit gap-4 sm:flex">
      <FilterByType type={filters.type} />
      <FilterByCategory
        income={categories.income}
        expense={categories.expense}
        category={filters.category}
      />
      <FilterByDate filterDateRange={{ from: filters.from, to: filters.to }} />
      {hasValidFilter && <FilterReset />}
    </div>
  );
};
