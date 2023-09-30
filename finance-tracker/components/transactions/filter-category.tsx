"use client";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { Check, ChevronDown, LayoutGrid } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

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

interface FilterCategoryProps {
  categories: Category[];
}

export const FilterCategory = ({ categories }: FilterCategoryProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParams = searchParams.get("category")?.toLowerCase();
  const isValidCategory = categoryParams
    ? categories.some((category) => category.slug === categoryParams)
    : false;
  const category = categories.find(
    (category) => category.slug === categoryParams,
  );

  const onSelect = (value: string) => {
    const current = queryString.parse(searchParams.toString());
    const query = {
      ...current,
      category: value.toLowerCase(),
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

  const expense = categories.filter((category) => category.type === "EXPENSE");
  const income = categories.filter((category) => category.type === "INCOME");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="flex max-h-10 w-full justify-start gap-2"
        >
          <LayoutGrid className="h-4 w-4 opacity-50" />
          {isValidCategory ? (
            <div className="flex items-center gap-2 leading-none">
              <span>{category?.emoji}</span>
              <span>{category?.title}</span>
            </div>
          ) : (
            "Category"
          )}
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup heading="Expense">
            {expense.map((category) => (
              <CommandItem
                value={category.slug}
                key={category.id}
                onSelect={() => {
                  onSelect(category.slug);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    category.slug === categoryParams
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {category.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Income">
            {income.map((category) => (
              <CommandItem
                value={category.slug}
                key={category.id}
                onSelect={() => {
                  onSelect(category.slug);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    category.slug === categoryParams
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {category.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
