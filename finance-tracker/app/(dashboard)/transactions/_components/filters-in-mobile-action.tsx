"use client";

import { SlidersHorizontal } from "lucide-react";
import { useFilterTransactionsStore } from "@/hooks/use-filter-transactions";

import { Button } from "@/components/ui/button";

export const FiltersInMobileAction = () => {
  const { onOpen } = useFilterTransactionsStore();
  return (
    <div className="w-full sm:hidden">
      <Button variant="secondary" className="w-full gap-2 " onClick={onOpen}>
        <SlidersHorizontal className="h-4 w-4" /> Edit Filters
      </Button>
    </div>
  );
};
