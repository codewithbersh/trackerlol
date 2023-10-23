"use client";

import { Plus } from "lucide-react";
import { useCategoryModal } from "@/hooks/use-category-modal";

import { Button } from "@/components/ui/button";

export const Action = () => {
  const { onOpen, setCategory } = useCategoryModal();
  return (
    <Button
      className="gap-2"
      variant="brand"
      onClick={() => {
        setCategory(null);
        onOpen();
      }}
    >
      <Plus className="h-4 w-4" />
      <div>
        Add <span className="hidden sm:inline"> Category</span>
      </div>
    </Button>
  );
};
