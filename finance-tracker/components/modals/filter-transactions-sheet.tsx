"use client";

import { useFilterTransactionsStore } from "@/hooks/use-filter-transactions";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ValidateSearchParamsType } from "@/components/transactions/utils";
import { FiltersInMobile } from "@/components/transactions/filters-in-mobile";

interface FilterTransactionsSheetProps {
  filters: ValidateSearchParamsType;
}

export const FilterTransactionsSheet = ({
  filters,
}: FilterTransactionsSheetProps) => {
  const { isOpen, onClose } = useFilterTransactionsStore();
  return (
    <Sheet onOpenChange={onClose} open={isOpen}>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Apply Filters</SheetTitle>
          <SheetDescription>Filter transactions</SheetDescription>
        </SheetHeader>
        <FiltersInMobile filters={filters} />
      </SheetContent>
    </Sheet>
  );
};
