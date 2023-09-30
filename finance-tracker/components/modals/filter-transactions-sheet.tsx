"use client";

import { useFilterTransactionsStore } from "@/hooks/use-filter-transactions";
import { Category } from "@prisma/client";

import { Filters } from "@/components/transactions/filters";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface FilterTransactionsSheetProps {
  categories: Category[];
  hasValidQuery: boolean;
}

export const FilterTransactionsSheet = ({
  categories,
  hasValidQuery,
}: FilterTransactionsSheetProps) => {
  const { isOpen, onClose } = useFilterTransactionsStore();
  return (
    <Sheet onOpenChange={onClose} open={isOpen}>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Apply Filters</SheetTitle>
          <SheetDescription>Filter transactions</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-8">
          <Filters categories={categories} hasValidQuery={hasValidQuery} />
        </div>
        <Button className="w-full" onClick={onClose}>
          Close
        </Button>
      </SheetContent>
    </Sheet>
  );
};
