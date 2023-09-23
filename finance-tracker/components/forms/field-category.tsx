"use client";

import { useState } from "react";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Dot, PlusCircle, Settings2 } from "lucide-react";
import { Category } from "@prisma/client";

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
  PopoverContentWithoutPortal,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FieldCategoryProps {
  selectedType: "INCOME" | "EXPENSE";
  onChange: (value: string) => void;
  value: string;
  isLoading: boolean;
  categories: {
    income: Category[];
    expense: Category[];
  };
}

export const FieldCategory = ({
  onChange,
  value,
  isLoading: isSubmitting,
  categories,
  selectedType,
}: FieldCategoryProps) => {
  const [open, setOpen] = useState(false);
  const { onOpen, setCategory } = useCategoryModal();

  const selectedCategories =
    selectedType === "EXPENSE" ? categories.expense : categories.income;

  const selectedCategory = selectedCategories.find(
    (category) => category.id === value
  );
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              disabled={isSubmitting}
              variant="outline"
              role="combobox"
              className={cn(
                "w-full sm:w-full justify-between",
                !value && "text-muted-foreground"
              )}
            >
              {value ? (
                <div className="flex gap-2 items-center w-full ">
                  <div
                    className="p-1 rounded-full leading-none text-base"
                    style={{
                      backgroundColor: selectedCategory?.color,
                    }}
                  >
                    {selectedCategory?.emoji}
                  </div>
                  <span>{selectedCategory?.title}</span>
                </div>
              ) : (
                "Select a category"
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>

        <PopoverContentWithoutPortal className="p-0" align="center">
          <Command className="bg-none backdrop-blur-none ">
            <CommandList>
              <CommandInput placeholder="Search categories..." />
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup className="max-h-[150px] overflow-y-auto">
                {selectedCategories.map((category) => (
                  <CommandItem
                    key={category.id}
                    onSelect={() => {
                      onChange(category.id);
                      setOpen(false);
                    }}
                    className="flex gap-2 h-fit"
                  >
                    <Dot
                      strokeWidth={4}
                      className={cn(
                        "text-primary-foreground",
                        category.id === value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div
                      className="flex items-center gap-2 text-neutral-950 rounded-full font-medium px-3 py-1 leading-none"
                      style={{ backgroundColor: category.color }}
                    >
                      <span>{category.emoji}</span>
                      <span>{category.title}</span>
                    </div>

                    <Button
                      className="h-6 w-6 ml-auto"
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCategory(category);
                        onOpen();
                      }}
                      type="button"
                    >
                      <Settings2 className="w-4 h-4" />
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
                    "w-full justify-start"
                  )}
                >
                  <div className="w-6 h-6" />
                  <PlusCircle className="w-4 h-4 mr-2" />
                  New Category
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContentWithoutPortal>
      </Popover>
    </>
  );
};
