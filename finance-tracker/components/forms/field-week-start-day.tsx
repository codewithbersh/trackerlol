"use client";

import { cn } from "@/lib/utils";
import { WeekStartDay } from "@prisma/client";
import { CHOICES_WEEK_START_DAY } from "@/lib/constants";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FieldWeekStartDayProps {
  value: WeekStartDay;
  onChange: (value: WeekStartDay) => void;
}

export const FieldWeekStartDay = ({
  value,
  onChange,
}: FieldWeekStartDayProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn("w-full", !value && "text-muted-foreground")}
      >
        <SelectValue placeholder="Select week start day" />
      </SelectTrigger>
      <SelectContent>
        {CHOICES_WEEK_START_DAY.map((day) => (
          <SelectItem key={day.value} value={day.value}>
            {day.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
