"use client";

import { useOverallBudget } from "@/hooks/use-overall-budget-modal";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export const NoOverallBudget = () => {
  const { onOpen, setBudget } = useOverallBudget();

  return (
    <div className="grid w-full place-items-center gap-4 py-8">
      <div className="text-sm text-muted-foreground">No overall budget.</div>
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => {
          setBudget(null);
          onOpen();
        }}
      >
        <Plus className="h-4 w-4" /> Add Budget
      </Button>
    </div>
  );
};
