import { hasValidFilters, validateSearchParams } from "./utils";
import { FiltersInMobileAction } from "./filters-in-mobile-action";
import { FiltersInDesktop } from "./filters-in-desktop";

import { FilterTransactionsSheet } from "@/components/modals/filter-transactions-sheet";
import prismadb from "@/lib/prismadb";
import { getCurrentUser } from "@/actions/get-current-user";
import { redirect } from "next/navigation";

interface FiltersProps {
  searchParams: { [key: string]: string | undefined };
}

export const Filters = async ({ searchParams }: FiltersProps) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const categories = await prismadb.category.findMany({
    where: {
      userId: user.id,
    },
  });

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
