"use client";

import { useEffect, useState } from "react";
import { Category } from "@prisma/client";
import { useFilterTransactionsStore } from "@/hooks/use-filter-transactions";

import { Dialog, DialogContentRight } from "@/components/ui/dialog";
import { FormFilterTransactions } from "@/components/forms/form-filter-transactions";

export const FilterTransactionsModal = ({
  categories,
}: {
  categories: Category[];
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose } = useFilterTransactionsStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContentRight>
        <FormFilterTransactions categories={categories} />
      </DialogContentRight>
    </Dialog>
  );
};
