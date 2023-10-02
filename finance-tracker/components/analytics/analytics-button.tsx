"use client";

import { cn, getRangeDefaultValue } from "@/lib/utils";
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

interface AnalyticsButtonProps {
  range: string | undefined;
}

export const AnalyticsButton = ({ range }: AnalyticsButtonProps) => {
  const defaultValue = getRangeDefaultValue(range);
  const router = useRouter();

  return (
    <>
      <Select
        defaultValue={defaultValue}
        onValueChange={(value) => router.push(`/analytics?range=${value}`)}
      >
        <SelectTrigger
          className={cn(buttonVariants({ variant: "outline" }), "w-fit gap-2")}
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
