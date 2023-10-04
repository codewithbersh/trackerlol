import { getNetOverall } from "@/actions/get-net-overall";
import { getTopCategories } from "@/actions/get-top-categories";

import { AnalyticsButton } from "@/components/analytics/analytics-button";
import { NetOverall } from "@/components/analytics/net-overall";
import { OverallBudget } from "@/components/analytics/overall-budget";
import { TopCategories } from "@/components/analytics/top-categories";
import { PageHeading } from "@/components/page-heading";

interface AnalyticsPageProps {
  searchParams: { [key: string]: string | undefined };
}

const AnalyticsPage = async ({ searchParams }: AnalyticsPageProps) => {
  const range = searchParams.range;
  const { netOverall, totalIncome, totalExpense } = await getNetOverall({
    range,
  });

  const topCategories = await getTopCategories(range);

  return (
    <div className="mt-[60px] flex  flex-col py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Analytics">
        <AnalyticsButton range={range} />
      </PageHeading>

      <div className="mt-8 grid w-full grid-cols-12 gap-4">
        <NetOverall
          netOverall={netOverall}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />
        <OverallBudget />
        <TopCategories topCategories={topCategories} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
