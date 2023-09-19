import { useRouter, useSearchParams } from "next/navigation";
import { useFilterTransactionsStore } from "@/hooks/use-filter-transactions";
import queryString from "query-string";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const FilterSheet = () => {
  const { isOpen, onClose, dateQuery, setDateQuery } =
    useFilterTransactionsStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: dateQuery?.from,
    to: dateQuery?.to,
  });

  const handleApplyFilters = () => {
    const query = queryString.parse(searchParams.toString());
    query.from = date && date.from ? format(date.from, "yyy-MM-dd") : null;
    query.to = date && date.to ? format(date.to, "yyy-MM-dd") : null;

    const url = queryString.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    setDateQuery(date);
    router.push(url);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Apply Filters</SheetTitle>
          <SheetDescription>Filter transactions</SheetDescription>
        </SheetHeader>

        <div className="mt-12 space-y-6">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
              />
            </PopoverContent>
          </Popover>
          <Button onClick={handleApplyFilters}>Apply Filters</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
