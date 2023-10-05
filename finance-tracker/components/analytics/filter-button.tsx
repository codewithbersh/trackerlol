"use client";

import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRangeDefaultValue } from "./utils";

const filterAnalytics = [
  {
    label: "This week",
    value: "week",
  },
  {
    label: "This month",
    value: "month",
  },
  {
    label: "This year",
    value: "year",
  },
];

interface FilterButtonProps {
  range: string | undefined;
}

export const FilterButton = ({ range }: FilterButtonProps) => {
  const defaultValue = getRangeDefaultValue(range);
  const router = useRouter();

  return (
    <>
      <Select
        defaultValue={defaultValue}
        onValueChange={(value) => router.push(`/analytics?range=${value}`)}
      >
        <SelectTrigger
          className={cn(buttonVariants({ variant: "default" }), "w-fit gap-2")}
        >
          <CalendarDays className="h-4 w-4" />
          <SelectValue placeholder="Select date" />
        </SelectTrigger>
        <SelectContent>
          {filterAnalytics.map((filter) => (
            <SelectItem value={filter.value} key={filter.value}>
              {filter.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};
