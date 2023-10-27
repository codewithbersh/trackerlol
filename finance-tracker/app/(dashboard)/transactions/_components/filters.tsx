import {
  ValidateSearchParamsType,
  hasValidFilters,
  validateSearchParams,
} from "./utils";
import { FiltersInMobileAction } from "./filters-in-mobile-action";
import { FiltersInDesktop } from "./filters-in-desktop";

import { FilterTransactionsSheet } from "@/components/modals/filter-transactions-sheet";
import { serverClient } from "@/app/_trpc/server";

interface FiltersProps {
  searchParams: { [key: string]: string | undefined };
}

export const Filters = async ({ searchParams }: FiltersProps) => {
  const categories = await serverClient.getCategories();
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
      <FilterTransactionsSheet filters={filters} />
    </div>
  );
};
