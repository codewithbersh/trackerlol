"use client";

import { useState } from "react";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import useCategoryData from "@/hooks/use-category-data";
import { Budget } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FieldCategoryProps {
  selectedType: "INCOME" | "EXPENSE";
  onChange: (value: string) => void;
  value: string | undefined;
  isLoading: boolean;
  budgets?: Budget[];
}

export const FieldCategory = ({
  onChange,
  value,
  isLoading: isSubmitting,
  selectedType,
  budgets,
}: FieldCategoryProps) => {
  const { data: categories } = useCategoryData();
  const [open, setOpen] = useState(false);

  const selectedCategories =
    selectedType === "EXPENSE" ? categories?.expense : categories?.income;

  const selectedCategory = selectedCategories?.find(
    (category) => category.id === value,
  );

  const categoriesList = budgets
    ? selectedCategories?.filter(
        (category) =>
          !budgets.some((budget) => budget.categoryId === category.id),
      )
    : selectedCategories;

  return (
    <>
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="flex max-h-10 min-h-[38px] w-full justify-start gap-2"
            disabled={isSubmitting}
            onClick={() => {
              setOpen(true);
            }}
          >
            {value ? (
              <div className="flex items-center gap-2 leading-none">
                <span>{selectedCategory?.emoji}</span>
                <span>{selectedCategory?.title}</span>
              </div>
            ) : (
              <span className="text-muted-foreground">Select category</span>
            )}
            <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="max-w-[462px]  p-0 sm:max-w-[223px]"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search category..." />
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup heading={selectedType}>
              {selectedCategories?.map((category) => (
                <CommandItem
                  value={category.title}
                  key={category.id}
                  onSelect={() => {
                    onChange(category.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      category.id === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {category.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};
