import cc from "currency-codes";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

interface FieldCurrencyProps {
  value: string;
  onChange: (value: string) => void;
}

export const FieldCurrency = ({ value, onChange }: FieldCurrencyProps) => {
  const currencies = cc.data;
  const selectedCurrency = cc.code(value);

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <div>
          <span> {selectedCurrency?.code}, </span>
          <span className="text-muted-foreground/50">
            {selectedCurrency?.currency}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent className="max-h-[350px]">
        {currencies.map((currency) => (
          <SelectItem value={currency.code} key={currency.code}>
            <span>{currency.code}, </span>{" "}
            <span className="text-muted-foreground/50">
              {currency.currency}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
