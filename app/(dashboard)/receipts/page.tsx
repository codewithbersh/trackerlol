import { PageHeading } from "@/components/page-heading";
import { MainWrapper } from "@/components/main-wrapper";

import { ReceiptsAction } from "./_components/receipts-action";
import { Filters } from "./_components/filters";
import { Receipts } from "./_components/receipts";

interface ReceiptsPageProps {
  searchParams: { [key: string]: string | undefined };
}

const ReceiptsPage = ({ searchParams }: ReceiptsPageProps) => {
  const categoryId = searchParams.categoryId;
  return (
    <div className="mt-[60px] flex  flex-col py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Receipts">
        <ReceiptsAction />
      </PageHeading>

      <MainWrapper>
        <div className="flex flex-col gap-8">
          <Filters categoryId={categoryId} />
          <Receipts categoryId={categoryId} />
        </div>
      </MainWrapper>
    </div>
  );
};

export default ReceiptsPage;
