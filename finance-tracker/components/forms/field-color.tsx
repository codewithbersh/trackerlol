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
import { Button } from "../ui/button";

interface FieldColorProps {
  value: string;
  onChange: (value: string) => void;
  type: "EXPENSE" | "INCOME";
  categories: Category[] | undefined;
}

export const FieldColor = ({
  value,
  onChange,
  type,
  categories,
}: FieldColorProps) => {
  const colors = type === "EXPENSE" ? expenseColors : incomeColors;

  return (
    <div className="grid w-full grid-cols-5 items-center gap-2 sm:max-h-20">
      {colors.map((color) => (
        <button
          key={color.value}
          type="button"
          className={cn(
            " aspect-square w-full max-w-[55px] rounded-full sm:w-5",
            categories
              ? categories.some((category) => category.color === color.value) &&
                  "cursor-not-allowed blur-sm"
              : "animate-pulse cursor-not-allowed blur-sm",
          )}
          disabled={
            categories
              ? categories.some((category) => category.color === color.value)
              : true
          }
          style={{ backgroundColor: color.value }}
          onClick={() => onChange(color.value)}
        />
      ))}

      <Popover>
        <PopoverTrigger asChild>
          <Button className="aspect-square w-full max-w-[55px] rounded-full p-0 sm:h-5 sm:w-5">
            <Plus className="aspect-square w-full  text-primary-foreground sm:w-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-fit">
          <HexColorPicker color={value} onChange={onChange} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
