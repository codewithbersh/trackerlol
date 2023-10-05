import { cn } from "@/lib/utils";
import { TransactionType } from "@prisma/client";
import { TRANSACTION_TYPES } from "@/lib/constants";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { buttonVariants } from "@/components/ui/button";

interface FieldTypeProps {
  value: TransactionType;
  onChange: (value: TransactionType) => void;
}

export const FieldType = ({ value, onChange }: FieldTypeProps) => {
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
          <RadioGroupItem hidden value={type.value} id={type.value} />
          <Label
            className={cn(
              "w-full cursor-pointer border border-input opacity-50",
              buttonVariants({ variant: "default" }),
              value.toLocaleUpperCase() === type.value.toUpperCase() &&
                "opacity-100 ring-2 ring-ring ring-offset-2 ring-offset-secondary ",
            )}
            htmlFor={type.value}
          >
            {type.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
