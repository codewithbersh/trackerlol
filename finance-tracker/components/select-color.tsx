"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { colors } from "@/lib/colors";
import { ActionTooltip } from "./action-tooltip";
import useCategoryData from "@/hooks/use-category-data";
import { cn } from "@/lib/utils";

interface SelectColorProps {
  value: string;
  onChange: (value: string) => void;
  isLoading: boolean;
}

export const SelectColor = ({
  value,
  onChange,
  isLoading,
}: SelectColorProps) => {
  const { data: categories } = useCategoryData();

  return (
    <RadioGroup
      defaultValue={value}
      onValueChange={onChange}
      className="grid grid-cols-10 "
      disabled={isLoading}
    >
      {colors.map((color) => (
        <ActionTooltip label={color.name} key={color.value}>
          <RadioGroupItem
            value={color.value}
            className={cn(
              "w-full h-full rounded-md border-none col-span-1",
              categories!.some((category) => category.color === color.value) &&
                "blur-sm"
            )}
            style={{ backgroundColor: color.value }}
            disabled={categories!.some(
              (category) => category.color === color.value
            )}
          />
        </ActionTooltip>
      ))}
    </RadioGroup>
  );
};
