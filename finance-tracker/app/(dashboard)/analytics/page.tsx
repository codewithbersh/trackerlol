import { PageHeading } from "@/components/page-heading";
import { MainWrapper } from "@/components/main-wrapper";

import { FilterButton } from "./_components/filter-button";
import { Summary } from "./_components/summary";
import { Overall } from "./_components/overall";
import { Categories } from "./_components/categories";
import { Budgets } from "./_components/budgets";

interface AnalyticsPageProps {
  searchParams: { [key: string]: string | undefined };
}

const AnalyticsPage = ({ searchParams }: AnalyticsPageProps) => {
  const range = searchParams.range;

  return (
    <div className="mt-[60px] flex  flex-col py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Analytics">
        <FilterButton range={range} />
      </PageHeading>

      <MainWrapper>
        <div className="grid w-full grid-cols-12 gap-4">
          <Summary range={range} />
          <Overall />
          <Categories range={range} />
          <Budgets />
        </div>
      </MainWrapper>
    </div>
  );
};

export default AnalyticsPage;
