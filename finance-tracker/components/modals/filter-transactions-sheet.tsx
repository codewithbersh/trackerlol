"use client";

import { useFilterTransactionsStore } from "@/hooks/use-filter-transactions";

import { ValidateSearchParamsType } from "@/app/(dashboard)/transactions/_components/utils";
import { FiltersInMobile } from "@/app/(dashboard)/transactions/_components/filters-in-mobile";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Categories } from "@/app/_trpc/client";

interface FilterTransactionsSheetProps {
  filters: ValidateSearchParamsType;
  categories: Categories;
  showReset: boolean;
}

export const FilterTransactionsSheet = ({
  filters,
  categories,
  showReset,
}: FilterTransactionsSheetProps) => {
  const { isOpen, onClose } = useFilterTransactionsStore();
  return (
    <Sheet onOpenChange={onClose} open={isOpen}>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Apply Filters</SheetTitle>
          <SheetDescription>Filter transactions</SheetDescription>
        </SheetHeader>
        <FiltersInMobile
          filters={filters}
          categories={categories}
          showReset={showReset}
        />
      </SheetContent>
    </Sheet>
  );
};
