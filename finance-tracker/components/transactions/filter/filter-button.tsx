"use client";

import { SlidersHorizontal } from "lucide-react";
import { useFilterTransactionsStore } from "@/hooks/use-filter-transactions";

import { Button } from "@/components/ui/button";
import { ActiveFilterButton } from "./active-filter-button";

export const FilterButton = () => {
  const { onOpen, dateQuery } = useFilterTransactionsStore();

  return (
    <Button
      variant="outline"
      type="button"
      className="w-fit gap-2 h-fit min-h-[43.62px]"
      onClick={onOpen}
    >
      <SlidersHorizontal className="w-4 h-4 shrink-0" />
      Filters
      {dateQuery?.from && <ActiveFilterButton dateQuery={dateQuery} />}
    </Button>
  );
};
