"use client";

import { Button } from "@/components/ui/button";
import { useCategoryModal } from "@/hooks/use-category-modal";

export const TransactionsClient = () => {
  const { onOpen } = useCategoryModal();

  return <Button onClick={onOpen}>New Category</Button>;
};
