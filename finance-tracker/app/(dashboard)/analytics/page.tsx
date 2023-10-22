import { Suspense } from "react";

import { PageHeading } from "@/components/page-heading";
import { MainWrapper } from "@/components/main-wrapper";

import { FilterButton } from "./_components/filter-button";
import { Summary } from "./_components/summary";
import { Overall } from "./_components/overall";
import { Categories } from "./_components/categories";
import { Budgets } from "./_components/budgets";
import { AnalyticsLoading } from "./_components/analytics-loading";

interface AnalyticsPageProps {
  searchParams: { [key: string]: string | undefined };
}

const AnalyticsPage = async ({ searchParams }: AnalyticsPageProps) => {
  const range = searchParams.range;

  return (
    <div className="mt-[60px] flex  flex-col py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Analytics">
        <FilterButton range={range} />
      </PageHeading>

      <MainWrapper>
        <div className="grid w-full grid-cols-12 gap-4">
          <Suspense
            fallback={
              <AnalyticsLoading
                className="sm:col-span-6 md:col-span-3"
                numberOfSpinners={3}
              />
            }
          >
            <Summary range={range} />
          </Suspense>

          <Suspense
            fallback={
              <AnalyticsLoading className="sm:col-span-6 md:col-span-3" />
            }
          >
            <Overall />
          </Suspense>

          <Suspense fallback={<AnalyticsLoading className="md:col-span-6" />}>
            <Categories range={range} />
          </Suspense>

          <Suspense fallback={<AnalyticsLoading className="md:col-span-6" />}>
            <Budgets />
          </Suspense>
        </div>
      </MainWrapper>
    </div>
  );
};

export default AnalyticsPage;
