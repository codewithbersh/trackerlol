"use client";

import { hasValidFilters, validateSearchParams } from "./utils";
import { FiltersInMobileAction } from "./filters-in-mobile-action";
import { FiltersInDesktop } from "./filters-in-desktop";

import { FilterTransactionsSheet } from "@/components/modals/filter-transactions-sheet";
import { trpc } from "@/app/_trpc/client";
import { Spinner } from "@/components/spinner";

interface FiltersProps {
  searchParams: { [key: string]: string | undefined };
}

export const Filters = ({ searchParams }: FiltersProps) => {
  const { data: categories, isLoading } = trpc.category.get.useQuery(
    undefined,
    {
      staleTime: Infinity,
    },
  );

  if (isLoading) {
    return <Spinner className="py-12 md:py-24" />;
  }

  if (!categories) return null;

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
