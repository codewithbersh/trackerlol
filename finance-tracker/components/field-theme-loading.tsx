import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { THEMES } from "@/lib/constants";
import { Label } from "./ui/label";

export const FieldThemeLoading = () => {
  return (
    <RadioGroup className="flex  flex-col gap-4">
      {THEMES.map(({ value, label, icon: Icon }) => (
        <Label
          key={value}
          className="flex w-full cursor-not-allowed items-center justify-between rounded-sm border p-2 hover:bg-accent/20"
          htmlFor={value}
        >
          <div className="flex items-center gap-4">
            <div className="rounded bg-accent/50 p-2">
              <Icon className="h-4 w-4" />
            </div>
            <div>{label}</div>
          </div>
          <RadioGroupItem disabled value={value} id={value} />
        </Label>
      ))}
    </RadioGroup>
  );
};
