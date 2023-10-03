import { OverallBudget } from "@/components/budgets/overall-budget";
import { ModeToggle } from "@/components/mode-toggle";
import { PageHeading } from "@/components/page-heading";

const BudgetsPage = async () => {
  return (
    <div className="mt-[60px] flex  flex-col space-y-12 py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Budgets" />

      <div className="space-y-6">
        <h1 className="font-semibold">Overall</h1>
        <OverallBudget />
        {/* <ModeToggle /> */}
      </div>
    </div>
  );
};

export default BudgetsPage;
