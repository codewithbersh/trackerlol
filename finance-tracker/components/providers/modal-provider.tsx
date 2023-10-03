"use client";

import { useEffect, useState } from "react";
import { useTransactionModal } from "@/hooks/use-transaction-modal";

import { TransactionModal } from "@/components/modals/transaction-modal";
import { CategoryModal } from "@/components/modals/category-modal";
import { BudgetModal } from "@/components/modals/budget-modal";
import { ReceiptModal } from "@/components/modals/receipt-modal";
import { OverallBudgetModal } from "@/components/modals/overall-budget-modal";
import { CategoryBudgetModal } from "@/components/modals/category-budget-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { onOpen, setTransaction } = useTransactionModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setTransaction(null);
        onOpen();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onOpen, setTransaction]);

  if (!isMounted) return null;
  return (
    <>
      <TransactionModal />
      <CategoryModal />
      <BudgetModal />
      <ReceiptModal />
      <OverallBudgetModal />
      <CategoryBudgetModal />
    </>
  );
};

export default ModalProvider;
