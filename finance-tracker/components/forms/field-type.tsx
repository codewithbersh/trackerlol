import { cn } from "@/lib/utils";
import { useId } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { buttonVariants } from "@/components/ui/button";

interface FieldTypeProps {
  value: "EXPENSE" | "INCOME";
  onChange: (value: "EXPENSE" | "INCOME") => void;
}

export const FieldType = ({ value, onChange }: FieldTypeProps) => {
  const transactionTypes = [
    {
      label: "Expense",
      value: "EXPENSE",
      id: useId(),
    },
    {
      label: "Income",
      value: "INCOME",
      id: useId(),
    },
  ];
  return (
    <RadioGroup
      onValueChange={(value: "EXPENSE" | "INCOME") => {
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
              "w-full cursor-pointer border-input border",
              buttonVariants({ variant: "secondary" }),
              value === type.value &&
                "ring-2 ring-offset-2 ring-offset-secondary ring-ring "
            )}
          >
            {type.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
