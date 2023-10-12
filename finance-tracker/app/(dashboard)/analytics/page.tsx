import { Suspense } from "react";

import { PageHeading } from "@/components/page-heading";

import { FilterButton } from "./_components/filter-button";
import { Summary } from "./_components/summary";
import { Overall } from "./_components/overall";
import { Categories } from "./_components/categories";
import { Budgets } from "./_components/budgets";

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

      <div className="mt-8 grid w-full grid-cols-12 gap-4">
        <Suspense fallback={<p>Loading...</p>}>
          <Summary range={range} />
        </Suspense>

        <Suspense fallback={<p>Loading...</p>}>
          <Overall />
        </Suspense>

        <Suspense fallback={<p>Loading...</p>}>
          <Categories range={range} />
        </Suspense>

        <Suspense fallback={<p>Loading...</p>}>
          <Budgets />
        </Suspense>
      </div>
    </div>
  );
};

export default AnalyticsPage;
