import { MouseEvent } from "react";
import { useFilterTransactionsStore } from "@/hooks/use-filter-transactions";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

interface ActiveFilterButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  removeQuery: "dateQuery" | "typeQuery" | "categoryQuery";
  buttonText?: string;
}

export const ActiveFilterButton = ({
  removeQuery,
  buttonText,
  className,
  children,
  ...props
}: ActiveFilterButtonProps) => {
  const { setDateQuery, setTypeQuery, setCategoryQuery } =
    useFilterTransactionsStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleRemoveQuery = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    const query = queryString.parse(searchParams.toString());

    if (removeQuery === "dateQuery") {
      setDateQuery(undefined);
      query.from = null;
      query.to = null;
    } else if (removeQuery === "typeQuery") {
      setTypeQuery(undefined);
      query.type = null;
    } else if (removeQuery === "categoryQuery") {
      setCategoryQuery(undefined);
      query.category = null;
    }

    const url = queryString.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div
      className={cn(
        "relative text-xs px-2 py-1 border border-neutral-700 bg-neutral-800 rounded-sm group",
        className
      )}
      onClick={(e) => handleRemoveQuery(e)}
      {...props}
    >
      {children}
      {buttonText}
      <div className="absolute -top-1.5 -right-1.5 p-0.5 bg-muted-foreground text-muted rounded-full group-hover:bg-foreground">
        <X className="w-3 h-3" />
      </div>
    </div>
  );
};
