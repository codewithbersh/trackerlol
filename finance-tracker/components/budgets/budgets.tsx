import { BudgetWithCategory } from "@/types/types";

import { Budget } from "./budget";

interface BudgetsProps {
  budgets: BudgetWithCategory[];
  type: string;
}

export const Budgets = ({ budgets, type }: BudgetsProps) => {
  return (
    <div className="space-y-2">
      <div className="text-muted-foreground text-sm px-4">{type}</div>
      <div className="flex flex-col gap-4">
        {budgets.length === 0 && (
          <div className="w-full py-4 text-center text-muted-foreground text-sm">
            No budget found.{" "}
          </div>
        )}
        {budgets.map((budget) => (
          <Budget budget={budget} key={budget.id} />
        ))}
      </div>
    </div>
  );
};
