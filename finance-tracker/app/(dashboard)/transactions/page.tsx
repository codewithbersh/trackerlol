import { getCategories } from "@/actions/get-categories";
import { Suspense } from "react";

import { PageHeading } from "@/components/page-heading";
import { TransactionsAction } from "@/components/transactions/tranasctions-action";
import { Filters } from "@/components/transactions/filters";
import { validateSearchparams } from "@/components/transactions/utils";
import { Transactions } from "@/components/transactions/transactions";

interface TransactionsPageProps {
  searchParams: { [key: string]: string | undefined };
}

const TransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
  const categories = await getCategories();
  const filters = validateSearchparams({
    searchParams,
    categories,
  });

  return (
    <div className="mt-[60px] flex  flex-col py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Transactions">
        <TransactionsAction />
      </PageHeading>

      <Filters filters={filters} />

      <Suspense fallback={<p>Loading...</p>}>
        <Transactions filters={filters.filters} />
      </Suspense>
    </div>
  );
};

export default TransactionsPage;
