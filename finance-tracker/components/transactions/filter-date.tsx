"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn, stringToDate } from "@/lib/utils";
import queryString from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export function FilterDate({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const from = stringToDate(searchParams.get("from"));
  const to = stringToDate(searchParams.get("to"));
  const [date, setDate] = useState<DateRange | undefined>({
    from,
    to,
  });

  const onSelect = (range: DateRange | undefined) => {
    const current = queryString.parse(searchParams.toString());
    const query = {
      ...current,
      from: range?.from
        ? format(range.from, "yyyy-MM-dd")?.toString().toLowerCase()
        : undefined,
      to: range?.to
        ? format(range.to, "yyyy-MM-dd")?.toString().toLowerCase()
        : undefined,
    };

    const url = queryString.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  return (
    <div className={cn("grid shrink-0 gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("gap-2  text-left font-normal")}
          >
            <CalendarIcon className="h-4 w-4 opacity-50" />
            {from ? (
              to ? (
                <>
                  {format(from, "LLL dd")} - {format(to, "LLL dd")}
                </>
              ) : (
                format(from, "LLL dd")
              )
            ) : (
              <span>Date</span>
            )}
            <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={{ from, to }}
            onSelect={(range) => {
              setDate(range);
              onSelect(range);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
