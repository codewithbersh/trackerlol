import { MainWrapper } from "@/components/main-wrapper";
import { PageHeading } from "@/components/page-heading";

import { TransactionsAction } from "./_components/tranasctions-action";
import { Transactions } from "./_components/transactions";
import { Filters } from "./_components/filters";

interface TransactionsPageProps {
  searchParams: { [key: string]: string | undefined };
}

const TransactionsPage = ({ searchParams }: TransactionsPageProps) => {
  return (
    <div className="mt-16 flex flex-col  lg:mt-0">
      <PageHeading title="Transactions">
        <TransactionsAction />
      </PageHeading>

      <MainWrapper>
        <div className="space-y-8 pb-8">
          <Filters searchParams={searchParams} />
          <Transactions searchParams={searchParams} />
        </div>
      </MainWrapper>
    </div>
  );
};

export default TransactionsPage;
