"use client";

import { cn, toTitleCase } from "@/lib/utils";
import { Check, ChevronDown, Shapes } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FilterByTypeProps {
  type: "EXPENSE" | "INCOME" | undefined;
}

export const FilterByType = ({ type: typeParams }: FilterByTypeProps) => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const TRANSACTION_TYPES = [
    {
      label: "Expense",
      value: "expense",
      id: useId(),
    },
    {
      label: "Income",
      value: "income",
      id: useId(),
    },
  ];

  const onSelect = (value: string) => {
    const current = queryString.parse(searchParams.toString());
    const query = {
      ...current,
      type: value.toLowerCase(),
    };

    const url = queryString.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true },
    );

    setOpen(false);

    router.push(url);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "flex max-h-10 w-full justify-start gap-2",
            typeParams && "border-brand text-brand hover:text-brand",
          )}
          onClick={() => {
            setOpen(true);
          }}
        >
          <Shapes className="h-4 w-4 opacity-50" />
          {typeParams ? <div>{toTitleCase(typeParams)}</div> : "Type"}
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[200px] p-0" align="start">
        <Command>
          <CommandGroup>
            {TRANSACTION_TYPES.map((type) => (
              <CommandItem
                value={type.value}
                key={type.value}
                onSelect={() => {
                  onSelect(type.value);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 ",
                    type.value.toUpperCase() == typeParams?.toUpperCase()
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {type.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
