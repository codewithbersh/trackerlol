"use client";

import { hasValidFilters, validateSearchParams } from "./utils";
import { FiltersInMobileAction } from "./filters-in-mobile-action";
import { FiltersInDesktop } from "./filters-in-desktop";
import { Categories, trpc } from "@/app/_trpc/client";

import { FilterTransactionsSheet } from "@/components/modals/filter-transactions-sheet";

interface FiltersProps {
  searchParams: { [key: string]: string | undefined };
}

export const Filters = ({ searchParams }: FiltersProps) => {
  const { data: categories } = trpc.getCategories.useQuery(undefined, {
    staleTime: Infinity,
  });
  if (!categories) {
    return null;
  }
  const filters = validateSearchParams({ searchParams, categories });
  const showReset = hasValidFilters({ searchParams });

  return (
    <div>
      <FiltersInDesktop
        filters={filters}
        showReset={showReset}
        categories={categories}
      />
      <FiltersInMobileAction />
      <FilterTransactionsSheet
        filters={filters}
        showReset={showReset}
        categories={categories}
      />
    </div>
  );
};
