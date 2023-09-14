"use client";

import { useEffect, useState } from "react";

import { ExpenseCategoryModal } from "@/components/modals/category/expense-category-modal";
import { TransactionModal } from "@/components/modals/transaction/transaction-modal";

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
    </>
  );
};

export default ModalProvider;
