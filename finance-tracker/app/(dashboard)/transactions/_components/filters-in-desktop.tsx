import { ValidateSearchParamsType } from "./utils";
import { Categories } from "@/app/_trpc/client";

import { FilterByType } from "./filter-by-type";
import { FilterByCategory } from "./filter-by-category";
import { FilterByDate } from "./filter-by-date";
import { FilterReset } from "./filter-reset";

interface FiltersInDesktopProps {
  filters: ValidateSearchParamsType;
  showReset: boolean;
  categories: Categories;
}

export const FiltersInDesktop = ({
  filters: { filters },
  showReset,
  categories,
}: FiltersInDesktopProps) => {
  return (
    <div className="hidden w-fit gap-4 sm:flex">
      <FilterByType type={filters.type} />
      <FilterByCategory
        income={categories.filter((category) => category.type === "INCOME")}
        expense={categories.filter((category) => category.type === "EXPENSE")}
        category={filters.category}
      />
      <FilterByDate filterDateRange={{ from: filters.from, to: filters.to }} />
      {showReset && <FilterReset href="/transactions" />}
    </div>
  );
};
