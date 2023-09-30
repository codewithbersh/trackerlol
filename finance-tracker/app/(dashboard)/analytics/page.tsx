import { cn, validateRangeParams } from "@/lib/utils";
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
import { CategoryBudgets } from "@/components/analytics/category-budgets";
import { OverallBudget } from "@/components/analytics/overall-budget";

interface AnalyticsPageProps {
  searchParams: { [key: string]: string | undefined };
}

const AnalyticsPage = async ({ searchParams }: AnalyticsPageProps) => {
  const range = searchParams.range;
  const { from, to, range: rangeType } = validateRangeParams(range);
  const transactions = await getTransactions({ from, to });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 py-24">
      <div className="flex flex-col justify-between items-center gap-2 col-span-full">
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
      <CategoryBudgets />
      <OverallBudget />
    </div>
  );
};

export default AnalyticsPage;
