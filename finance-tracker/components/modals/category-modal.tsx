"use client";

import { Category } from "@prisma/client";
import { useCategoryModal } from "@/hooks/use-category-modal";

import { Modal } from "@/components/ui/modal";
import { FormCategory } from "@/components/forms/form-category";

interface CategoryModalProps {
  categories: {
    income: Category[];
    expense: Category[];
  };
}

export const CategoryModal = ({ categories }: CategoryModalProps) => {
  const { isOpen, onClose } = useCategoryModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="py-10">
      <FormCategory />
    </Modal>
  );
};
