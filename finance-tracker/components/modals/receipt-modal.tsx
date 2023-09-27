"use client";

import { useReceiptModal } from "@/hooks/use-receipt-modal";

import { Modal } from "@/components/ui/modal";
import { FormReceipt } from "@/components/forms/form-receipt";

export const ReceiptModal = () => {
  const { isOpen, onClose } = useReceiptModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="py-10">
      <FormReceipt />
    </Modal>
  );
};
