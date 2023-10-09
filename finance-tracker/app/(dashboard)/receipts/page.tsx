import { Suspense } from "react";

import { PageHeading } from "@/components/page-heading";
import { Receipts } from "@/components/receipts/receipts";
import { ReceiptsAction } from "@/components/receipts/receipts-action";
import { Filters } from "@/components/receipts/filters";

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
