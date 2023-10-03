"use client";

import { useBudgetModal } from "@/hooks/use-budget-modal";

import { Modal } from "@/components/ui/modal";
import { FormBudget } from "@/components/forms/form-budget";

export const BudgetModal = () => {
  const { isOpen, onClose } = useBudgetModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="py-10">
      {/* <FormBudget /> */}
    </Modal>
  );
};
