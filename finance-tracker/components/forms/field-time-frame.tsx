import { cn } from "@/lib/utils";
import { useId } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { buttonVariants } from "@/components/ui/button";

interface FieldTimeFrame {
  value: "DAILY" | "WEEKLY" | "MONTHLY";
  onChange: (value: "DAILY" | "WEEKLY" | "MONTHLY") => void;
}

export const FieldTimeFrame = ({ value, onChange }: FieldTimeFrame) => {
  const transactionTypes = [
    {
      label: "Daily",
      value: "DAILY",
      id: useId(),
    },
    {
      label: "Weekly",
      value: "WEEKLY",
      id: useId(),
    },
    {
      label: "Monthly",
      value: "MONTHLY",
      id: useId(),
    },
  ];
  return (
    <RadioGroup
      onValueChange={(value: "DAILY" | "WEEKLY" | "MONTHLY") => {
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
