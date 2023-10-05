import { Transaction } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FieldTransactionsProps {
  transactions: Transaction[] | undefined;
  value: string | undefined | null;
  onChange: (value: string | undefined | null) => void;
}

export const FieldTransactions = ({
  transactions,
  value,
  onChange,
}: FieldTransactionsProps) => {
  return (
    <Select value={value ?? undefined} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select transaction" />
      </SelectTrigger>
      <SelectContent className="max-h-[250px] ">
        {transactions?.map((transaction) => (
          <SelectItem value={transaction.id} key={transaction.id}>
            <div className="flex gap-1 ">
              <div>
                {transaction.note.length === 0 ? "No note." : transaction.note}
              </div>
              <div className="text-muted-foreground">
                for $ {Number(transaction.amount).toLocaleString("en-US")}
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
