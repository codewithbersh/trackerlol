"use client";

import { useOverallBudget } from "@/hooks/use-overall-budget-modal";
import { Plus } from "lucide-react";

export const NoOverallBudget = () => {
  const { onOpen, setBudget } = useOverallBudget();

  return (
    <div
      className="group grid w-full cursor-pointer place-items-center rounded-md border border-dashed border-border bg-background py-8 hover:bg-accent/20"
      onClick={() => {
        setBudget(null);
        onOpen();
      }}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-fit rounded-sm bg-accent p-2 group-hover:bg-accent/80">
          <Plus className="h-5 w-5 group-hover:text-primary" />
        </div>
        <span className="text-sm text-muted-foreground group-hover:text-primary">
          Add Budget
        </span>
      </div>
    </div>
  );
};
