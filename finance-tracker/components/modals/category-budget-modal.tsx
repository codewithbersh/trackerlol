"use client";

import { useCategoryBudget } from "@/hooks/use-category-budget-modal";

import { Modal } from "@/components/ui/modal";
import { FormCategoryBudget } from "@/components/forms/form-category-budget";

export const CategoryBudgetModal = () => {
  const { isOpen, onClose } = useCategoryBudget();

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="py-10">
      <FormCategoryBudget />
    </Modal>
  );
};
