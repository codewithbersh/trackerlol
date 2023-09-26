"use client";

import { Plus } from "lucide-react";
import { useBudgetModal } from "@/hooks/use-budget-modal";

import { Button } from "./ui/button";

export const BudgetButton = () => {
  const { onOpen } = useBudgetModal();
  return (
    <Button
      className="w-fit gap-2 h-fit min-h-[43.62px] mx-auto border-border border font-bold"
      variant="secondary"
      onClick={onOpen}
    >
      <Plus className="w-4 h-4 shrink-0" />
      New Budget
    </Button>
  );
};
