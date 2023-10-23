import { TransactionType } from "@prisma/client";

import { FilterByType } from "@/app/(dashboard)/transactions/_components/filter-by-type";
import { FilterReset } from "@/app/(dashboard)/transactions/_components/filter-reset";

interface FiltersProps {
  type: TransactionType | undefined;
}

export const Filters = ({ type }: FiltersProps) => {
  return (
    <div className="flex w-fit items-center gap-4">
      <FilterByType type={type} />
      {type && <FilterReset href="/categories" />}
    </div>
  );
};
