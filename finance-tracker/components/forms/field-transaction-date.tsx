"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface FieldTransactionDateProps {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
  isLoading: boolean;
}

export const FieldTransactionDate = ({
  value,
  onChange,
  isLoading,
}: FieldTransactionDateProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className={cn(
              "w-full border border-input pl-3 text-left font-normal",
              !value && "text-muted-foreground",
            )}
            disabled={isLoading}
            onClick={() => setOpen(true)}
          >
            {value ? format(value, "MMMM dd") : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(value) => {
            onChange(value);
            setOpen(false);
          }}
          initialFocus
          defaultMonth={value || new Date()}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
        />
      </PopoverContent>
    </Popover>
  );
};
