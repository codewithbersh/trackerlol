import { FilterByType } from "@/app/(dashboard)/transactions/_components/filter-by-type";
import { FilterReset } from "@/app/(dashboard)/transactions/_components/filter-reset";
import { validateTypeParams } from "@/app/(dashboard)/transactions/_components/utils";

export const Filters = ({ type }: { type: string | string[] | undefined }) => {
  return (
    <div className="flex w-fit items-center gap-4">
      <FilterByType type={validateTypeParams(type)} />
      {type && <FilterReset href="/categories" />}
    </div>
  );
};
