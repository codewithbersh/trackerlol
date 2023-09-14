"use client";

import { useEffect, useState } from "react";

import { TransactionModal } from "@/components/modals/transaction/transaction-modal";
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
      <EditExpenseCategoryModal />
    </>
  );
};

export default ModalProvider;
