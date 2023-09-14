"use client";

import { useState } from "react";
import useCategoryData from "@/hooks/use-category-data";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronsUpDown,
  Loader2,
  PlusCircle,
  Settings2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
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

interface CategorySelectProps {
  onChange: (value: string) => void;
  value: string;
}

export const CategorySelect = ({ onChange, value }: CategorySelectProps) => {
  const [open, setOpen] = useState(false);
  const { onOpen } = useCategoryModal();
  const { data: categories, isLoading, isError } = useCategoryData();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[300px] sm:w-full justify-between",
              !value && "text-muted-foreground"
            )}
          >
            {value
              ? categories?.find((category) => category.id === value)?.title
              : "Select a category"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] sm:w-[462px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search categories..." />
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {(isLoading || isError) && (
                <div className="w-full flex py-6">
                  {isLoading && (
                    <Loader2 className="animate-spin mx-auto w-4 h-4 text-muted-foreground" />
                  )}
                  {isError && (
                    <p className="text-muted-foreground text-center text-sm w-full">
                      An error has occured. Try again later.
                    </p>
                  )}
                </div>
              )}
              {categories?.map((category) => (
                <CommandItem
                  value={category.id}
                  key={category.id}
                  onSelect={(value) => {
                    onChange(value);
                    setOpen(false);
                  }}
                  className="mt-2 flex gap-2"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      category.id === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div
                    className="text-xl p-1 rounded-md leading-none w-7 h-7"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.emoji}
                  </div>
                  <span className="leading-none">{category.title}</span>

                  <Button
                    className="h-6 w-6 ml-auto"
                    size="icon"
                    variant="ghost"
                    onClick={(e) => e.stopPropagation()}
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
                onSelect={onOpen}
                className="px-4"
                disabled={isLoading || isError}
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                New Category
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
