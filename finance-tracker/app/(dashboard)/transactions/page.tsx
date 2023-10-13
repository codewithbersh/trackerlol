import { getCategories } from "@/actions/get-categories";
import { Suspense } from "react";

import { validateSearchParams } from "./_components/utils";
import { TransactionsAction } from "./_components/tranasctions-action";
import { Filters } from "./_components/filters";
import { Transactions } from "./_components/transactions";

import { PageHeading } from "@/components/page-heading";

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
    <div className="mt-[60px] flex  flex-col py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Transactions">
        <TransactionsAction />
      </PageHeading>

      <div className="mt-8 space-y-8">
        <Filters filters={filters} />

        <Suspense fallback={<p>Loading...</p>}>
          <Transactions filters={filters.filters} />
        </Suspense>
      </div>
    </div>
  );
};

export default TransactionsPage;
