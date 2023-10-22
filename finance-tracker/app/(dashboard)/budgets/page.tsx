import { Suspense } from "react";

import { PageHeading } from "@/components/page-heading";
import { Spinner } from "@/components/spinner";
import { MainWrapper } from "@/components/main-wrapper";

import { Overall } from "./_components/overall";
import { Categories } from "./_components/categories";
import { CategoriesAction } from "./_components/categories-action";

const BudgetsPage = async () => {
  return (
    <div className="mt-[60px] flex  flex-col py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Budgets" />

      <MainWrapper>
        <div className="space-y-16">
          <div className="flex flex-col gap-6">
            <h1 className="font-semibold">Overall</h1>
            <Suspense fallback={<Spinner className="py-8" variant="large" />}>
              <Overall />
            </Suspense>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold leading-none">Categories</h1>
              <CategoriesAction />
            </div>
            <Suspense fallback={<Spinner className="py-8" variant="large" />}>
              <Categories />
            </Suspense>
          </div>
        </div>
      </MainWrapper>
    </div>
  );
};

export default BudgetsPage;
