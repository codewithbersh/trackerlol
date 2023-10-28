import { Suspense } from "react";

import { MainWrapper } from "@/components/main-wrapper";
import { PageHeading } from "@/components/page-heading";
import { Spinner } from "@/components/spinner";

import { TransactionsAction } from "./_components/tranasctions-action";
import { Transactions } from "./_components/transactions";
import { Filters } from "./_components/filters";

interface TransactionsPageProps {
  searchParams: { [key: string]: string | undefined };
}

const TransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
  return (
    <div className="mt-16 flex flex-col  lg:mt-0">
      <PageHeading title="Transactions">
        <TransactionsAction />
      </PageHeading>

      <MainWrapper>
        <div className="space-y-8">
          <Filters searchParams={searchParams} />

          <Suspense fallback={<Spinner variant="large" className="py-8" />}>
            <Transactions searchParams={searchParams} />
          </Suspense>
        </div>
      </MainWrapper>
    </div>
  );
};

export default TransactionsPage;
