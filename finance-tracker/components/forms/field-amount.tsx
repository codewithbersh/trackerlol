import { cn } from "@/lib/utils";
import {
  NumberFormatValues,
  NumericFormat,
  NumericFormatProps,
} from "react-number-format";

interface InputNumberProps extends NumericFormatProps {
  maxLength?: number;
  onValueChange: (value: any) => void;
  value: number;
  decimalScale?: number;
  className?: string;
}

export const FieldAmount = ({
  maxLength = 9_999_999,
  onValueChange,
  value,
  decimalScale = 0,
  className,
}: InputNumberProps) => {
  return (
    <NumericFormat
      placeholder="$  0.00"
      prefix="$  "
      className={cn(
        "flex h-10 w-full rounded-full border border-input bg-secondary px-3 py-2 text-sm ring-offset-secondary file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      min={1}
      allowNegative={false}
      thousandSeparator
      decimalScale={decimalScale}
      allowLeadingZeros={false}
      isAllowed={(values) => {
        if (!values.value) return true;
        const { floatValue } = values;
        return floatValue! < maxLength;
      }}
      value={value}
      onValueChange={(values: NumberFormatValues) =>
        onValueChange(values.value)
      }
      autoFocus
    />
  );
};
