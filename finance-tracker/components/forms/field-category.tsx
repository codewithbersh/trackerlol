"use client";

import { useState } from "react";
import { cn, toTitleCase } from "@/lib/utils";
import { Check, ChevronDown, Plus, Settings2 } from "lucide-react";
import { Category } from "@prisma/client";
import { useCategoryModal } from "@/hooks/use-category-modal";

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

interface FieldCategoryProps {
  selectedType: "INCOME" | "EXPENSE";
  onChange: (value: string) => void;
  value: string | undefined;
  isLoading: boolean;
  categories: Category[] | undefined;
}

export const FieldCategory = ({
  onChange,
  value,
  isLoading: isSubmitting,
  selectedType,
  categories,
}: FieldCategoryProps) => {
  const [open, setOpen] = useState(false);
  const { onOpen, setCategory } = useCategoryModal();

  const selectedCategory = categories?.find(
    (category) => category.id === value,
  );

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
            <CommandEmpty
              className={cn(
                "py-6 text-center text-sm",
                categories?.length === 0 && "hidden",
              )}
            >
              No category found.
            </CommandEmpty>
            {categories?.length === 0 ? (
              <div className="py-6 text-center text-sm">
                No categories found.
              </div>
            ) : (
              <CommandGroup heading={toTitleCase(selectedType)}>
                {categories?.map((category) => (
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
                    <Button
                      className="group ml-auto h-fit w-fit p-1 hover:bg-muted"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCategory(category);
                        onOpen();
                      }}
                    >
                      <Settings2 className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    </Button>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                className="flex items-center gap-2"
                onSelect={() => {
                  setCategory(null);
                  onOpen();
                }}
              >
                <Plus className="h-4 w-4" />
                <div className="text-sm leading-none">New Category</div>
              </CommandItem>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};
