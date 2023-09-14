import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { colors } from "@/lib/colors";
import { ActionTooltip } from "./action-tooltip";

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
            id="option-one"
            className="w-full h-full rounded-md border-none col-span-1"
            style={{ backgroundColor: color.value }}
          />
        </ActionTooltip>
      ))}
    </RadioGroup>
  );
};
