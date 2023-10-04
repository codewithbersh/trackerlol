import { ValidateSearchParamsType } from "./utils";
import { FiltersInMobileAction } from "./filters-in-mobile-action";
import { FiltersInDesktop } from "./filters-in-desktop";
import { FilterTransactionsSheet } from "@/components/modals/filter-transactions-sheet";

interface FiltersProps {
  filters: ValidateSearchParamsType;
}

export const Filters = ({ filters }: FiltersProps) => {
  return (
    <div className="py-8">
      <FiltersInDesktop filters={filters} />
      <FiltersInMobileAction />
      <FilterTransactionsSheet filters={filters} />
    </div>
  );
};
