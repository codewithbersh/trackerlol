import { getCategories } from "@/actions/get-categories";
import { Suspense } from "react";

import { MainWrapper } from "@/components/main-wrapper";
import { PageHeading } from "@/components/page-heading";
import { Spinner } from "@/components/spinner";

import { validateSearchParams } from "./_components/utils";
import { Transactions } from "./_components/transactions";
import { TransactionsAction } from "./_components/tranasctions-action";
import { Filters } from "./_components/filters";

interface TransactionsPageProps {
  searchParams: { [key: string]: string | undefined };
}

const TransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
  const categories = await getCategories();
  const filters = validateSearchParams({
    searchParams,
    categories,
  });

  return (
    <div className="mt-16 flex flex-col  lg:mt-0">
      <PageHeading title="Transactions">
        <TransactionsAction />
      </PageHeading>

      <MainWrapper>
        <div className="space-y-8">
          <Filters filters={filters} />

          <Suspense fallback={<Spinner variant="large" className="py-8" />}>
            <Transactions filters={filters.filters} />
          </Suspense>
        </div>
      </MainWrapper>
    </div>
  );
};

export default TransactionsPage;
