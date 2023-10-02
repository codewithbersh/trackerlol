"use client";

import { useOverallBudget } from "@/hooks/use-overall-budget-modal";

import { Modal } from "@/components/ui/modal";
import { FormOverallBudget } from "@/components/forms/form-overall-budget";

export const OverallBudgetModal = () => {
  const { isOpen, onClose } = useOverallBudget();

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="py-10">
      <FormOverallBudget />
    </Modal>
  );
};
