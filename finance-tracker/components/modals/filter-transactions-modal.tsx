"use client";

import { Category } from "@prisma/client";
import { useFilterTransactionsStore } from "@/hooks/use-filter-transactions";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Filters } from "../transactions/filters";

export const FilterTransactionsModal = ({
  categories,
  hasValidQuery,
}: {
  categories: Category[];
  hasValidQuery: boolean;
}) => {
  const { isOpen, onClose } = useFilterTransactionsStore();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="">
        <Filters categories={categories} hasValidQuery={hasValidQuery} />
      </DialogContent>
    </Dialog>
  );
};
