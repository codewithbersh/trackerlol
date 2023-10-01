"use client";

import { cn, toTitleCase } from "@/lib/utils";
import { Category } from "@prisma/client";
import { Check, ChevronDown, LayoutGrid } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const types = [
  {
    label: "Expense",
    value: "expense",
  },
  {
    label: "Income",
    value: "income",
  },
];

export const FilterType = () => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const typeParams = searchParams.get("type")?.toLowerCase();
  const isValidType = typeParams
    ? ["income", "expense"].includes(typeParams)
    : false;

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
          className="flex max-h-10 w-full justify-start gap-2"
          onClick={() => {
            setOpen(true);
          }}
        >
          <LayoutGrid className="h-4 w-4 opacity-50" />
          {isValidType ? <div>{toTitleCase(typeParams!)}</div> : "Type"}
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[200px] p-0" align="start">
        <Command>
          <CommandGroup>
            {types.map((type) => (
              <CommandItem
                value={type.value}
                key={type.value}
                onSelect={() => {
                  onSelect(type.value);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    type.value === typeParams ? "opacity-100" : "opacity-0",
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
