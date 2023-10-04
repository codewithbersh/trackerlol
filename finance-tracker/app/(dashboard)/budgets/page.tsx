import { CategoriesBudget } from "@/components/budgets/categories-budget";
import { OverallBudget } from "@/components/budgets/overall-budget";
import { PageHeading } from "@/components/page-heading";

const BudgetsPage = async () => {
  return (
    <div className="mt-[60px] flex  flex-col py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Budgets" />

      <div className="mt-8 flex flex-col gap-16">
        <div className="flex flex-col gap-6">
          <h1 className="font-semibold">Overall</h1>
          <OverallBudget />
        </div>
        <CategoriesBudget />
      </div>
    </div>
  );
};

export default BudgetsPage;
