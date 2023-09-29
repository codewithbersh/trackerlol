import { cn } from "@/lib/utils";
import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import Link from "next/link";

import { getTransactions } from "@/actions/get-transactions";
import { AnalyticsButton } from "@/components/analytics/analytics-button";
import { NetOverall } from "@/components/analytics/net-overall";
import { TopCategories } from "@/components/analytics/top-categories";
import { buttonVariants } from "@/components/ui/button";

interface AnalyticsPageProps {
  searchParams: { [key: string]: string | undefined };
}

export function validateRangeParams(range: string | undefined) {
  const today = new Date();
  switch (range?.toLowerCase()) {
    case "month":
      return {
        from: startOfMonth(today),
        to: endOfMonth(today),
        range: "month",
      };
    case "year":
      return { from: startOfYear(today), to: endOfYear(today), range: "year" };
    default:
      return {
        from: startOfWeek(today, { weekStartsOn: 0 }),
        to: endOfWeek(today, { weekStartsOn: 0 }),
        range: "week",
      };
  }
}

const AnalyticsPage = async ({ searchParams }: AnalyticsPageProps) => {
  const range = searchParams.range;
  const { from, to, range: rangeType } = validateRangeParams(range);
  const transactions = await getTransactions({ from, to });

  return (
    <div className="flex flex-col gap-8 py-24">
      <div className="flex flex-col justify-between items-center gap-2">
        <AnalyticsButton range={range} />
        <Link
          href={`/transactions?from=${format(from, "yyyy-MM-dd")}&to=${format(
            to,
            "yyyy-MM-dd"
          )}`}
          className={cn(
            buttonVariants({ variant: "link" }),
            "text-muted-foreground underline hover:text-foreground"
          )}
        >
          View Transactions
        </Link>
      </div>
      <NetOverall transactions={transactions} />
      <TopCategories transactions={transactions} range={rangeType} />
    </div>
  );
};

export default AnalyticsPage;
