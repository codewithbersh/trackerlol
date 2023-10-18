import { DISPLAY_CENTS } from "@/lib/constants";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

interface FieldDisplayCentsProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const FieldDisplayCents = ({
  value,
  onChange,
}: FieldDisplayCentsProps) => {
  const selected = DISPLAY_CENTS.find(
    (item) => item.value === value.toString(),
  );
  return (
    <Select
      value={value.toString()}
      onValueChange={(value) => onChange(value.toLocaleLowerCase() === "true")}
    >
      <SelectTrigger className="w-full">
        <div>
          <span>{selected?.label}, </span>
          <span className="text-muted-foreground/50">
            {selected?.placeholder}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {DISPLAY_CENTS.map((option) => (
          <SelectItem value={option.value} key={option.value}>
            {option.label},{" "}
            <span className="text-muted-foreground">{option.placeholder}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
