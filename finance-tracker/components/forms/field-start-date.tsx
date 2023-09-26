import { startDateChoices } from "@/lib/utils";
import { TimeFrameType } from "@prisma/client";
import { format } from "date-fns";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FieldStartDateProps {
  timeFrame: TimeFrameType;
  value: string;
  onChange: (value: string) => void;
}

export const FieldStartDate = ({
  timeFrame,
  value,
  onChange,
}: FieldStartDateProps) => {
  const choices = startDateChoices(timeFrame);
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full rounded-full">
        <SelectValue placeholder="Select start date" />
      </SelectTrigger>
      <SelectContent className="max-h-[256px]">
        {choices.map((choice) => (
          <SelectItem
            key={choice.toDateString()}
            className="rounded-full"
            value={choice.toDateString()}
          >
            {timeFrame === "DAILY"
              ? "Everyday"
              : timeFrame === "WEEKLY"
              ? `Every ${format(choice, "iiii")}`
              : `Every ${format(choice, "do")} of the month`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
