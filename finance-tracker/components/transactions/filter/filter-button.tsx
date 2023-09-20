"use client";

import { SlidersHorizontal } from "lucide-react";
import { useFilterTransactionsStore } from "@/hooks/use-filter-transactions";

import { Button } from "@/components/ui/button";
import { ActiveFilterButton } from "./active-filter-button";
import { format } from "date-fns";

const formatDate = (date?: Date) => (date ? format(date, "LLL dd, y") : null);

export const FilterButton = () => {
  const { onOpen, dateQuery, typeQuery } = useFilterTransactionsStore();

  const dateQueryFrom = formatDate(dateQuery?.from);
  const dateQueryTo = formatDate(dateQuery?.to);
  const dateQueryText = `${dateQueryFrom}${
    dateQueryTo ? `-${dateQueryTo}` : ""
  }`;

  return (
    <Button
      variant="outline"
      type="button"
      className="w-fit gap-2 h-fit min-h-[43.62px]"
      onClick={onOpen}
    >
      <SlidersHorizontal className="w-4 h-4 shrink-0" />
      Filters
      {dateQuery?.from && (
        <ActiveFilterButton
          removeQuery="dateQuery"
          buttonText={dateQueryText}
        />
      )}
      {typeQuery && (
        <ActiveFilterButton removeQuery="typeQuery" buttonText={typeQuery} />
      )}
    </Button>
  );
};
