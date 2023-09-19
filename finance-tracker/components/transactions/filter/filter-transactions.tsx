"use client";

import { useEffect } from "react";
import { DateRange } from "react-day-picker";
import { useFilterTransactionsStore } from "@/hooks/use-filter-transactions";

import { FilterButton } from "./filter-button";
import { FilterSheet } from "./filter-sheet";

interface FilterTransactionsProps {
  dateRangeQuery: DateRange;
}

export const FilterTransactions = ({
  dateRangeQuery,
}: FilterTransactionsProps) => {
  const { setDateQuery } = useFilterTransactionsStore();

  useEffect(() => {
    setDateQuery(dateRangeQuery);
  }, [dateRangeQuery]);

  return (
    <>
      <FilterButton />
      <FilterSheet />
    </>
  );
};
