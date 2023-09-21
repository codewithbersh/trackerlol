"use client";

import { expenseColors, incomeColors } from "@/lib/colors";
import { cn } from "@/lib/utils";

import { RadioGroup, RadioGroupColorItem } from "@/components/ui/radio-group";
import { Category } from "@prisma/client";

interface FieldColorProps {
  value: string;
  onChange: (value: string) => void;
  isLoading: boolean;
  type: "EXPENSE" | "INCOME";
  categories: {
    income: Category[];
    expense: Category[];
  };
}

export const FieldColor = ({
  value,
  onChange,
  isLoading,
  type,
  categories,
}: FieldColorProps) => {
  const selectedCategoy =
    type === "EXPENSE" ? categories.expense : categories.income;

  const colors = type === "EXPENSE" ? expenseColors : incomeColors;

  return (
    <RadioGroup
      defaultValue={value}
      onValueChange={onChange}
      className="grid grid-cols-10 "
      disabled={isLoading}
    >
      {colors.map((color) => (
        <RadioGroupColorItem
          key={color.value}
          value={color.value}
          className={cn(
            "w-full h-full rounded-md border-none col-span-1",
            selectedCategoy.some(
              (category) => category.color === color.value
            ) && "blur-sm"
          )}
          style={{ backgroundColor: color.value }}
          disabled={selectedCategoy.some(
            (category) => category.color === color.value
          )}
        />
      ))}
    </RadioGroup>
  );
};
