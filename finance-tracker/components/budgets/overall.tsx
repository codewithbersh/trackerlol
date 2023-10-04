import { getOverallBudget } from "@/actions/get-overall-budget";

import { AddOverallBudget } from "@/components/add-overall-budget";
import { OverallBudget } from "./overall-budget";

export const Overall = async () => {
  const budget = await getOverallBudget();

  return (
    <>
      {budget ? (
        <>
          <OverallBudget budget={budget} />
        </>
      ) : (
        <>
          <AddOverallBudget />
        </>
      )}
    </>
  );
};
