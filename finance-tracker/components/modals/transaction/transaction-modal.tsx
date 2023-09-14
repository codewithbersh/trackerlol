"use client";

import { useTransactionModal } from "@/hooks/use-transaction-modal";

import { Modal } from "@/components/ui/modal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseCategoryModal } from "@/components/modals/category/expense-category-modal";
import { ExpenseTab } from "./expense/expense-tab";

export const TransactionModal = () => {
  const { isOpen, onClose } = useTransactionModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="py-10">
      <Tabs defaultValue="expense">
        <TabsList className="w-full">
          <TabsTrigger value="expense" className="w-full">
            Expense
          </TabsTrigger>
          <TabsTrigger value="income" className="w-full">
            Income
          </TabsTrigger>
        </TabsList>

        <ExpenseTab />
      </Tabs>

      {/* moved category modal so that it will be only mounted when transaction modal is opened */}
      <ExpenseCategoryModal />
    </Modal>
  );
};
