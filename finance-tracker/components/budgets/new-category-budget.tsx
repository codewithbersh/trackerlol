"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCategoryBudget } from "@/hooks/use-category-budget-modal";

export const NewCategoryBudget = () => {
  const { onOpen, setBudget } = useCategoryBudget();
  return (
    <Button
      className="items-center gap-2"
      onClick={() => {
        setBudget(null);
        onOpen();
      }}
    >
      <Plus className="h-4 w-4" />
      <div>
        New <span className="hidden sm:inline">Budget</span>
      </div>
    </Button>
  );
};
