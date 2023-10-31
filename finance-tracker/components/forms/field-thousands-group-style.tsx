import { THOUSAND_STYLES } from "@/lib/constants";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

interface FieldThousandsGroupStyleProps {
  value: string;
  onChange: (value: string) => void;
}

export const FieldThousandsGroupStyle = ({
  value,
  onChange,
}: FieldThousandsGroupStyleProps) => {
  const selected = THOUSAND_STYLES.find((item) => item.value === value);
  return (
    <Select value={value} defaultValue={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <div>
          <span> {selected?.label}, </span>
          <span className="text-muted-foreground/50">
            {selected?.placeholder}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {THOUSAND_STYLES.map((style) => (
          <SelectItem value={style.value} key={style.value}>
            {style.label},{" "}
            <span className="text-muted-foreground">{style.placeholder}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
