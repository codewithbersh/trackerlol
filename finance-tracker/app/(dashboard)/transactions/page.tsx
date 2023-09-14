"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useCategoryModal } from "@/hooks/use-category-modal";

const TransactionsPage = () => {
  const { onOpen } = useCategoryModal();
  return (
    <div className="h-screen grid place-items-center">
      {/* <ModeToggle /> */}
      <Button onClick={onOpen}>New Category</Button>
    </div>
  );
};

export default TransactionsPage;
