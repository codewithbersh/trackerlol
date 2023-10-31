import { PageHeading } from "@/components/page-heading";
import { MainWrapper } from "@/components/main-wrapper";

import { CategoriesAction } from "./_components/categories-action";
import { OverallBudget } from "./_components/overall-budget";
import { CategoriesBudgets } from "./_components/categories-budgets";

const BudgetsPage = () => {
  return (
    <div className="mt-[60px] flex  flex-col py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Budgets" />

      <MainWrapper>
        <div className="space-y-16">
          <div className="flex flex-col gap-6">
            <h1 className="font-semibold">Overall</h1>
            <OverallBudget />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold leading-none">Categories</h1>
              <CategoriesAction />
            </div>

            <CategoriesBudgets />
          </div>
        </div>
      </MainWrapper>
    </div>
  );
};

export default BudgetsPage;
