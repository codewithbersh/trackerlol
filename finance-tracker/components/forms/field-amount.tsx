import { cn } from "@/lib/utils";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import getSymbolFromCurrency from "currency-symbol-map";

interface InputNumberProps {
  maxLength?: number;
  onValueChange: (value: any) => void;
  value: number;
  className?: string;
  disabled: boolean;
  thousandsGroupStyle?: string;
  displayCents?: boolean;
  currency?: string;
}

export const FieldAmount = ({
  maxLength = 9_999_999_999,
  onValueChange,
  value,
  className,
  disabled,
  thousandsGroupStyle = "en-US",
  displayCents = true,
  currency = "USD",
}: InputNumberProps) => {
  const formattedThousandsGroupStyle =
    thousandsGroupStyle === "en-IN" ? "lakh" : "thousand";
  const decimalScale = displayCents ? 2 : 0;

  const prefix = `${getSymbolFromCurrency(currency)} `;

  return (
    <NumericFormat
      placeholder="$  0.00"
      prefix={prefix}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      min={1}
      allowNegative={false}
      thousandSeparator
      thousandsGroupStyle={formattedThousandsGroupStyle}
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
      disabled={disabled}
    />
  );
};
