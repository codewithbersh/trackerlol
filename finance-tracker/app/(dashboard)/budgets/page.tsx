import { PageHeading } from "@/components/page-heading";
import { MainWrapper } from "@/components/main-wrapper";

import { CategoriesAction } from "./_components/categories-action";
import { OverallBudget } from "./_components/overall-budget";
import { serverTrpc } from "@/app/_trpc/server";
import { CategoriesBudgets } from "./_components/categories-budgets";

const BudgetsPage = async () => {
  const profile = await serverTrpc.profile.get();
  const overallBudget = await serverTrpc.budget.overall.get();
  const categoriesBudgets = await serverTrpc.budget.categories.getAll();

  return (
    <div className="mt-[60px] flex  flex-col py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Budgets" />

      <MainWrapper>
        <div className="space-y-16">
          <div className="flex flex-col gap-6">
            <h1 className="font-semibold">Overall</h1>
            <OverallBudget profile={profile} initialData={overallBudget} />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold leading-none">Categories</h1>
              <CategoriesAction />
            </div>

            <CategoriesBudgets
              profile={profile}
              initialData={categoriesBudgets}
            />
          </div>
        </div>
      </MainWrapper>
    </div>
  );
};

export default BudgetsPage;
