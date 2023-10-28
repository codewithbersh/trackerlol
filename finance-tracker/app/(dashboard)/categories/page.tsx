import { Suspense } from "react";
import { PageHeading } from "@/components/page-heading";
import { MainWrapper } from "@/components/main-wrapper";
import { Spinner } from "@/components/spinner";

import { Action } from "./_components/action";
import { Filters } from "./_components/filters";
import { Categories } from "./_components/categories";

interface CategoriesPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const CategoriesPage = ({ searchParams }: CategoriesPageProps) => {
  const type = searchParams.type;

  return (
    <div className="mt-[60px] flex  flex-col py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Categories">
        <Action />
      </PageHeading>

      <MainWrapper>
        <div className="flex flex-col gap-8">
          <Filters type={type} />
          <Suspense fallback={<Spinner className="py-8" variant="large" />}>
            <Categories />
          </Suspense>
        </div>
      </MainWrapper>
    </div>
  );
};

export default CategoriesPage;
