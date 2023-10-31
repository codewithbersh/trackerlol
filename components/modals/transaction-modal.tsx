"use client";

import { useTransactionModal } from "@/hooks/use-transaction-modal";

import { Modal } from "@/components/ui/modal";
import { FormTransaction } from "@/components/forms/form-transaction";

export const TransactionModal = () => {
  const { isOpen, onClose, transaction } = useTransactionModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="py-10">
      <FormTransaction initialData={transaction} />
    </Modal>
  );
};
