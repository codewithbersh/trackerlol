"use client";

import { useState } from "react";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Dot, PlusCircle, Settings2 } from "lucide-react";
import useCategoryData from "@/hooks/use-category-data";
import { Budget } from "@prisma/client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryBadge } from "@/components/category-badge";

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
  const [open, setOpen] = useState(false);
  const { onOpen, setCategory } = useCategoryModal();
  const { data: categories } = useCategoryData();

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
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              disabled={isSubmitting || !categories}
              variant="secondary"
              role="combobox"
              className={cn(
                "w-full justify-between border border-input sm:w-full",
                !value && "text-muted-foreground",
              )}
            >
              {!categories ? (
                <div className="flex w-full items-center gap-2">
                  <Skeleton className="h-6 w-6 shrink-0 rounded-full" />
                  <Skeleton className="h-5 w-full rounded-full" />
                </div>
              ) : value ? (
                <div className="flex w-full items-center gap-2 ">
                  <div
                    className="rounded-full p-1 text-base leading-none"
                    style={{
                      backgroundColor: selectedCategory?.color,
                    }}
                  >
                    {selectedCategory?.emoji}
                  </div>
                  <span>{selectedCategory?.title}</span>
                </div>
              ) : (
                <span className="shrink-0">Select a category</span>
              )}

              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>

        <PopoverContent className="p-0" align="center">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search categories..." />
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup className="max-h-[150px] overflow-y-auto">
                {categoriesList?.length === 0 && (
                  <div className="py-6 text-center text-sm">
                    No category found.
                  </div>
                )}

                {categoriesList?.map((category) => (
                  <CommandItem
                    key={category.id}
                    onSelect={() => {
                      onChange(category.id);
                      setOpen(false);
                    }}
                    className="flex h-fit gap-2"
                  >
                    <Dot
                      strokeWidth={4}
                      className={cn(
                        "text-primary-foreground",
                        category.id === value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <CategoryBadge
                      backgroundColor={category.color}
                      emoji={category.emoji}
                      title={category.title}
                      variant="small"
                    />

                    <Button
                      className="ml-auto h-6 w-6"
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCategory(category);
                        onOpen();
                      }}
                      type="button"
                    >
                      <Settings2 className="h-4 w-4" />
                    </Button>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    onOpen();
                    setCategory(null);
                  }}
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                    "w-full justify-start",
                  )}
                >
                  <div className="h-6 w-6" />
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Category
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};
