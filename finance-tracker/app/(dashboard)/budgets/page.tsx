import { Suspense } from "react";

import { Categories } from "@/components/budgets/categories";
import { Overall } from "@/components/budgets/overall";
import { PageHeading } from "@/components/page-heading";

const BudgetsPage = async () => {
  return (
    <div className="mt-[60px] flex  flex-col py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Budgets" />

      <div className="mt-8 flex flex-col gap-16">
        <Suspense fallback={<p>Loading...</p>}>
          <Overall />
        </Suspense>

        <Suspense fallback={<p>Loading...</p>}>
          <Categories />
        </Suspense>
      </div>
    </div>
  );
};

export default BudgetsPage;
