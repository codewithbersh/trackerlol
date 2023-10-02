"use client";

import { cn } from "@/lib/utils";
import { WeekStartDay } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const weekStartDays = [
  {
    value: "SUNDAY",
    label: "Every Sunday",
  },
  {
    value: "MONDAY",
    label: "Every Monday",
  },
  {
    value: "TUESDAY",
    label: "Every Tuesday",
  },
  {
    value: "WEDNESDAY",
    label: "Every Wednesday",
  },
  {
    value: "THURSDAY",
    label: "Every Thursday",
  },
  {
    value: "FRIDAY",
    label: "Every Friday",
  },
  {
    value: "SATURDAY",
    label: "Every Saturday",
  },
];

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
        {weekStartDays.map((day) => (
          <SelectItem key={day.value} value={day.value}>
            {day.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
