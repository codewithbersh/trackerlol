import { Suspense } from "react";
import { TransactionType } from "@prisma/client";

import { Action } from "./_components/action";
import { validateTypeParams } from "@/app/(dashboard)/transactions/_components/utils";
import { Categories } from "./_components/categories";
import { Filters } from "./_components/filters";

import { PageHeading } from "@/components/page-heading";
import { Spinner } from "@/components/spinner";
import { MainWrapper } from "@/components/main-wrapper";

interface ReceiptsPageProps {
  searchParams: { [key: string]: string | undefined };
}

const CategoriesPage = ({ searchParams }: ReceiptsPageProps) => {
  const type = validateTypeParams(searchParams.type);

  return (
    <div className="mt-[60px] flex  flex-col py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Categories">
        <Action />
      </PageHeading>

      <MainWrapper>
        <div className="flex flex-col gap-8">
          <Filters type={type as TransactionType | undefined} />

          <Suspense fallback={<Spinner className="py-8" variant="large" />}>
            <Categories type={type as TransactionType | undefined} />
          </Suspense>
        </div>
      </MainWrapper>
    </div>
  );
};

export default CategoriesPage;
