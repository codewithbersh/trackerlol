import { validateRangeParams } from "@/lib/utils";
import { getTransactions } from "@/actions/get-transactions";

import { AnalyticsButton } from "@/components/analytics/analytics-button";
import { PageHeading } from "@/components/page-heading";

interface AnalyticsPageProps {
  searchParams: { [key: string]: string | undefined };
}

const AnalyticsPage = async ({ searchParams }: AnalyticsPageProps) => {
  const range = searchParams.range;
  const { from, to, range: rangeType } = validateRangeParams(range);
  const transactions = await getTransactions({ from, to });

  return (
    // <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 py-24">
    //   <div className="flex flex-col justify-between items-center gap-2 col-span-full">
    //     <AnalyticsButton range={range} />
    //     <Link
    //       href={`/transactions?from=${format(from, "yyyy-MM-dd")}&to=${format(
    //         to,
    //         "yyyy-MM-dd"
    //       )}`}
    //       className={cn(
    //         buttonVariants({ variant: "link" }),
    //         "text-muted-foreground underline hover:text-foreground"
    //       )}
    //     >
    //       View Transactions
    //     </Link>
    //   </div>
    //   <NetOverall transactions={transactions} />
    //   <TopCategories transactions={transactions} range={rangeType} />
    //   <CategoryBudgets />
    //   <OverallBudget />
    // </div>
    <div className="mt-[60px] flex  flex-col py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Analytics">
        <AnalyticsButton range={range} />
      </PageHeading>

      <div className="grid w-full grid-cols-12"></div>
    </div>
  );
};

export default AnalyticsPage;
