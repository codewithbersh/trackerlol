import { Category } from "@prisma/client";
import { X } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FilterCategory } from "./filter-category";
import { FilterDate } from "./filter-date";
import { FilterType } from "./filter-type";

interface FiltersProps {
  categories: Category[];
  hasValidQuery: boolean;
}

export const Filters = ({ categories, hasValidQuery }: FiltersProps) => {
  return (
    <>
      <FilterType />
      <FilterCategory categories={categories} />
      <FilterDate />
      {hasValidQuery && (
        <Link href="/transactions" passHref>
          <Button variant="ghost" className="gap-2">
            Reset <X className="h-4 w-4" />
          </Button>
        </Link>
      )}
    </>
  );
};
