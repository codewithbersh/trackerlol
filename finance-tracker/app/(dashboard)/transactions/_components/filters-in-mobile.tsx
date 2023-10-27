"use client";

import { ValidateSearchParamsType } from "./utils";
import { useFilterTransactionsStore } from "@/hooks/use-filter-transactions";
import { Categories } from "@/app/_trpc/client";

import { FilterByType } from "./filter-by-type";
import { FilterByCategory } from "./filter-by-category";
import { FilterByDate } from "./filter-by-date";
import { FilterReset } from "./filter-reset";

import { Button } from "@/components/ui/button";

interface FiltersInMobileProps {
  filters: ValidateSearchParamsType;
  categories: Categories;
  showReset: boolean;
}

export const FiltersInMobile = ({
  filters,
  categories,
  showReset,
}: FiltersInMobileProps) => {
  const { onClose } = useFilterTransactionsStore();
  return (
    <div>
      <div className="flex flex-col gap-4 py-8">
        <FilterByType type={filters.filters.type} />
        <FilterByCategory
          income={categories.income}
          expense={categories.expense}
          category={filters.filters.category}
        />
        <FilterByDate
          filterDateRange={{
            from: filters.filters.from,
            to: filters.filters.to,
          }}
        />
        {showReset && <FilterReset href="/transactions" />}
      </div>
      <Button className="w-full" onClick={onClose}>
        Close
      </Button>
    </div>
  );
};
