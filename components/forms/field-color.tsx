"use client";

import { HexColorPicker } from "react-colorful";
import { expenseColors, incomeColors } from "@/lib/colors";
import { Plus } from "lucide-react";
import { Category } from "@prisma/client";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface FieldColorProps {
  value: string;
  onChange: (value: string) => void;
  type: "EXPENSE" | "INCOME";
  categories: Category[] | undefined;
  isLoading: boolean;
}

export const FieldColor = ({
  value,
  onChange,
  type,
  categories,
  isLoading,
}: FieldColorProps) => {
  const colors = type === "EXPENSE" ? expenseColors : incomeColors;

  return (
    <div className="grid w-full grid-cols-5 items-center gap-1 sm:max-h-20">
      {colors.map((color) => (
        <button
          key={color.value}
          type="button"
          className={cn(
            " aspect-square w-full max-w-[55px] rounded-full sm:w-full",
            categories
              ? categories.some((category) => category.color === color.value) &&
                  "cursor-not-allowed blur-sm"
              : "animate-pulse cursor-not-allowed blur-sm",
          )}
          disabled={
            categories
              ? categories.some((category) => category.color === color.value)
              : isLoading
              ? true
              : true
          }
          style={{ backgroundColor: color.value }}
          onClick={() => onChange(color.value)}
        />
      ))}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="aspect-square w-full max-w-[55px] rounded-full border-primary/50 p-0"
            variant="outline"
          >
            <Plus className="aspect-square w-full sm:w-full" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-fit">
          <HexColorPicker color={value} onChange={onChange} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
