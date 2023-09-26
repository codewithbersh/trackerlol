import { cn } from "@/lib/utils";
import { useId } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { buttonVariants } from "@/components/ui/button";

interface FieldBudgetTypeProps {
  value: "CATEGORY" | "OVERALL";
  onChange: (value: "CATEGORY" | "OVERALL") => void;
}

export const FieldBudgetType = ({ value, onChange }: FieldBudgetTypeProps) => {
  const transactionTypes = [
    {
      label: "Category",
      value: "CATEGORY",
      id: useId(),
    },
    {
      label: "Overall",
      value: "OVERALL",
      id: useId(),
    },
  ];
  return (
    <RadioGroup
      onValueChange={(value: "CATEGORY" | "OVERALL") => {
        onChange(value);
      }}
      defaultValue={value}
      className="flex gap-4"
    >
      {transactionTypes.map((type) => (
        <div key={type.value} className="w-full">
          <RadioGroupItem hidden value={type.value} id={type.id} />
          <Label
            htmlFor={type.id}
            className={cn(
              "w-full cursor-pointer",
              buttonVariants({ variant: "secondary" }),
              value === type.value && "ring-2 ring-offset-4 ring-ring"
            )}
          >
            {type.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
