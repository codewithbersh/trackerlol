"use client";

import { useEffect } from "react";
import { DateRange } from "react-day-picker";
import { Category, TransactionType } from "@prisma/client";
import { useFilterTransactionsStore } from "@/hooks/use-filter-transactions";
import { SlidersHorizontal } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/category-badge";
import { FilterTransactionsModal } from "@/components/modals/filter-transactions-modal";
import { FilterActive } from "./filter-active";

interface FilterButtonProps {
  dateRangeQuery: DateRange;
  typeQuery: TransactionType | undefined;
  categories: Category[];
  categoryQuery: Category | undefined;
}

const formatDate = (date?: Date) => (date ? format(date, "LLL dd") : null);

export const FilterButton = ({
  dateRangeQuery,
  typeQuery,
  categories,
  categoryQuery,
}: FilterButtonProps) => {
  const {
    dateQuery,
    setDateQuery,
    setTypeQuery,
    onOpen,
    typeQuery: typeQueryState,
    setCategoryQuery,
  } = useFilterTransactionsStore();

  useEffect(() => {
    setDateQuery(dateRangeQuery);
    setTypeQuery(typeQuery);
    setCategoryQuery(categoryQuery?.slug);
  }, [
    dateRangeQuery,
    typeQuery,
    categoryQuery,
    setCategoryQuery,
    setDateQuery,
    setTypeQuery,
  ]);

  const dateQueryFrom = formatDate(dateQuery?.from);
  const dateQueryTo = formatDate(dateQuery?.to);
  const dateQueryText = `${dateQueryFrom}${
    dateQueryTo ? `—${dateQueryTo}` : ""
  }`;

  return (
    <>
      <Button
        variant="secondary"
        type="button"
        className="w-fit gap-2 h-fit min-h-[43.62px] mx-auto border-border border rounded-full"
        onClick={onOpen}
      >
        <SlidersHorizontal className="w-4 h-4 shrink-0" />
        <span className=" font-bold">Filters</span>
        {dateQuery?.from && (
          <FilterActive removeQuery="dateQuery" buttonText={dateQueryText} />
        )}
        {typeQueryState && (
          <FilterActive removeQuery="typeQuery" buttonText={typeQueryState} />
        )}
        {categoryQuery && (
          <FilterActive removeQuery="categoryQuery" className="border-0 p-0">
            <CategoryBadge
              variant="small"
              backgroundColor={categoryQuery.color}
              emoji={categoryQuery.emoji}
              title={categoryQuery.title}
              className="h-[26px]"
            />
          </FilterActive>
        )}
      </Button>

      <FilterTransactionsModal categories={categories} />
    </>
  );
};
