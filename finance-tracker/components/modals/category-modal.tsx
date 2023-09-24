"use client";

import { useCategoryModal } from "@/hooks/use-category-modal";

import { Modal } from "@/components/ui/modal";
import { FormCategory } from "@/components/forms/form-category";

export const CategoryModal = () => {
  const { isOpen, onClose } = useCategoryModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="py-10">
      <FormCategory />
    </Modal>
  );
};
