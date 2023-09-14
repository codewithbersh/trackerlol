"use client";

import { useEffect, useState } from "react";

import { TransactionModal } from "@/components/modals/transaction/transaction-modal";
import { ExpenseCategoryModal } from "@/components/modals/category/expense-category-modal";
import { EditExpenseCategoryModal } from "@/components/modals/category/edit-expense-category-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <TransactionModal />
      <ExpenseCategoryModal />
      <EditExpenseCategoryModal />
    </>
  );
};

export default ModalProvider;
