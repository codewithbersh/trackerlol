import { Suspense } from "react";

import { PageHeading } from "@/components/page-heading";
import { Spinner } from "@/components/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { MainWrapper } from "@/components/main-wrapper";

import { ReceiptsAction } from "./_components/receipts-action";
import { Filters } from "./_components/filters";
import { Receipts } from "./_components/receipts";

interface ReceiptsPageProps {
  searchParams: { [key: string]: string | undefined };
}

const ReceiptsPage = async ({ searchParams }: ReceiptsPageProps) => {
  return (
    <div className="mt-[60px] flex  flex-col py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Receipts">
        <ReceiptsAction />
      </PageHeading>

      <MainWrapper>
        <div className="flex flex-col gap-8">
          <Suspense fallback={<Skeleton className="h-[38px] w-[135px]" />}>
            <Filters searchParams={searchParams} />
          </Suspense>

          <Suspense fallback={<Spinner className="py-8" variant="large" />}>
            <Receipts searchParams={searchParams} />
          </Suspense>
        </div>
      </MainWrapper>
    </div>
  );
};

export default ReceiptsPage;
