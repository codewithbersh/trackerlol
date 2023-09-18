"use client";

import { useTransactionModal } from "@/hooks/use-transaction-modal";

import { Modal } from "@/components/ui/modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseForm } from "./expense/expense-form";

export const TransactionModal = () => {
  const { isOpen, onClose } = useTransactionModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="py-10">
      <Tabs defaultValue="expense" className="!max-w-full">
        <TabsList className="w-full">
          <TabsTrigger value="expense" className="w-full">
            Expense
          </TabsTrigger>
          <TabsTrigger value="income" className="w-full">
            Income
          </TabsTrigger>
        </TabsList>
        <TabsContent value="expense">
          <ExpenseForm />
        </TabsContent>
      </Tabs>
    </Modal>
  );
};
