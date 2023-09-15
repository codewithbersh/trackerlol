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

export const InputNumber = ({
  maxLength = 9_999_999,
  onValueChange,
  value,
  decimalScale = 0,
  className,
}: InputNumberProps) => {
  return (
    <NumericFormat
      placeholder="0"
      className={cn(
        "min-w-[50px] py-0 leading-none overflow-hidden max-w-[462px] sm:text-6xl font-bold bg-background outline-none text-5xl text-center",
        className
      )}
      min={1}
      style={{ width: `${value.toString().length + 0.5}ch` }}
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
