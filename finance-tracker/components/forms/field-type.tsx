import { cn } from "@/lib/utils";
import { TransactionType } from "@prisma/client";
import { useId } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { buttonVariants } from "@/components/ui/button";

interface FieldTypeProps {
  value: TransactionType;
  onChange: (value: TransactionType) => void;
}

export const FieldType = ({ value, onChange }: FieldTypeProps) => {
  const TRANSACTION_TYPES = [
    {
      label: "Expense",
      value: "expense",
      id: useId(),
    },
    {
      label: "Income",
      value: "income",
      id: useId(),
    },
  ];
  return (
    <RadioGroup
      onValueChange={(value: TransactionType) => {
        onChange(value);
      }}
      defaultValue={value}
      className="flex gap-4"
    >
      {TRANSACTION_TYPES.map((type) => (
        <div key={type.value} className="w-full">
          <RadioGroupItem hidden value={type.value} id={type.id} />
          <Label
            className={cn(
              "w-full cursor-pointer border border-input opacity-50",
              buttonVariants({ variant: "default" }),
              value.toLocaleUpperCase() === type.value.toUpperCase() &&
                "opacity-100 ring-2 ring-ring ring-offset-2 ring-offset-secondary ",
            )}
            htmlFor={type.id}
          >
            {type.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
