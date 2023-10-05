"use client";

import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MONTH_START_DATES } from "@/lib/constants";

interface FieldMonthStartDate {
  value: string;
  onChange: (value: string) => void;
}

export const FieldMonthStartDate = ({
  value,
  onChange,
}: FieldMonthStartDate) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn("w-full", !value && "text-muted-foreground")}
      >
        <SelectValue placeholder="Select month start date" />
      </SelectTrigger>
      <SelectContent className="max-h-[250px]">
        {MONTH_START_DATES.map((date) => (
          <SelectItem value={date.value} key={date.value}>
            {date.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
