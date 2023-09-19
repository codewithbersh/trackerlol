import { useFilterTransactionsStore } from "@/hooks/use-filter-transactions";
import { format } from "date-fns";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { MouseEvent } from "react";
import { DateRange } from "react-day-picker";

interface ActiveFilterButtonProps {
  dateQuery?: DateRange;
}

const formatDate = (date?: Date) => (date ? format(date, "LLL dd, y") : null);

export const ActiveFilterButton = ({ dateQuery }: ActiveFilterButtonProps) => {
  const { setDateQuery } = useFilterTransactionsStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const dateQueryFrom = formatDate(dateQuery?.from);
  const dateQueryTo = formatDate(dateQuery?.to);

  const text = dateQueryFrom
    ? `${dateQueryFrom}${dateQueryTo ? `-${dateQueryTo}` : ""}`
    : null;

  const handleRemoveQuery = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    if (dateQuery) {
      const query = queryString.parse(searchParams.toString());
      setDateQuery(undefined);

      query.from = null;
      query.to = null;

      const url = queryString.stringifyUrl(
        {
          url: window.location.href,
          query,
        },
        { skipNull: true }
      );

      router.push(url);
    }
  };

  return (
    <div
      className="relative text-xs px-2 py-1 border border-neutral-700 bg-neutral-800 rounded-sm group"
      onClick={(e) => handleRemoveQuery(e)}
    >
      {text && text}
      <div className="absolute -top-1.5 -right-1.5 p-0.5 bg-muted-foreground text-muted rounded-full group-hover:bg-foreground">
        <X className="w-3 h-3" />
      </div>
    </div>
  );
};
