import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { buttonVariants } from "@/components/ui/button";

const transactionTypes = [
  {
    label: "Expense",
    value: "EXPENSE",
  },
  {
    label: "Income",
    value: "INCOME",
  },
];

interface FieldTypeProps {
  value: "EXPENSE" | "INCOME";
  onChange: (value: "EXPENSE" | "INCOME") => void;
}

export const FieldType = ({ value, onChange }: FieldTypeProps) => {
  return (
    <RadioGroup
      onValueChange={onChange}
      defaultValue={value}
      className="flex gap-4"
    >
      {transactionTypes.map((type) => (
        <div key={type.value} className="w-full">
          <RadioGroupItem hidden value={type.value} id={type.value} />
          <Label
            htmlFor={type.value}
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
