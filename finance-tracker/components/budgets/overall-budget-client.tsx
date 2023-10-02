"use client";

import { OverallBudget } from "@prisma/client";

interface OverallBudgetClientProps {
  budget: OverallBudget;
}

export const OverallBudgetClient = ({ budget }: OverallBudgetClientProps) => {
  return <div>OverallBudgetClient</div>;
};
