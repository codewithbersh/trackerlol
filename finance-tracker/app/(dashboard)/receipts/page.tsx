import { Suspense } from "react";

import { ReceiptsAction } from "./_components/receipts-action";
import { Filters } from "./_components/filters";
import { Receipts } from "./_components/receipts";

import { PageHeading } from "@/components/page-heading";

interface ReceiptsPageProps {
  searchParams: { [key: string]: string | undefined };
}

const ReceiptsPage = async ({ searchParams }: ReceiptsPageProps) => {
  return (
    <div className="mt-[60px] flex  flex-col py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Receipts">
        <ReceiptsAction />
      </PageHeading>

      <div className="mt-8 flex flex-col gap-8">
        <Suspense fallback={<p>Loading...</p>}>
          <Filters searchParams={searchParams} />
        </Suspense>

        <Suspense fallback={<p>Loading...</p>}>
          <Receipts searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default ReceiptsPage;
