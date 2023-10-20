import { Duration } from "@prisma/client";
import { TRANSACTION_DURATION } from "@/lib/constants";
import { toTitleCase } from "@/lib/utils";
import { getRecurringIntervalDate } from "@/app/(dashboard)/transactions/_components/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

interface FieldRecurringIntervalProps {
  value: Duration | null;
  onChange: (value: Duration) => void;
  date: Date;
}

export const FieldRecurringInterval = ({
  value,
  onChange,
  date,
}: FieldRecurringIntervalProps) => {
  const intervalDate = getRecurringIntervalDate({ value, date });

  return (
    <Select value={value ? value : undefined} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        {value ? (
          <div>
            <span>{toTitleCase(value)}, </span>
            <span className="text-muted-foreground/50">{intervalDate}</span>
          </div>
        ) : (
          <div className="text-muted-foreground">Select Interval</div>
        )}
      </SelectTrigger>
      <SelectContent>
        {TRANSACTION_DURATION.map((duration) => (
          <SelectItem value={duration.value} key={duration.label}>
            {duration.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
