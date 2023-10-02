"use client";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface FieldYearStartDateProps {
  value: Date;
  onChange: (value: Date | undefined) => void;
}

export const FieldYearStartDate = ({
  value,
  onChange,
}: FieldYearStartDateProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "h-10 w-full pl-3 text-left font-normal",
              !value && "text-muted-foreground",
            )}
          >
            {value ? format(value, "PPP") : <span>Select year start date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
          defaultMonth={value}
        />
      </PopoverContent>
    </Popover>
  );
};
