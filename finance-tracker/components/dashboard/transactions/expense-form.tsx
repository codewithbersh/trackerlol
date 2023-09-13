"use client";

import { Button } from "@/components/ui/button";
import { useCategoryModal } from "@/hooks/use-category-modal";

export const ExpenseForm = () => {
  const { onOpen } = useCategoryModal();
  return (
    <div>
      <Button variant="outline" onClick={onOpen}>
        New Category
      </Button>
    </div>
  );
};
