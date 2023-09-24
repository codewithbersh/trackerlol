"use client";

import { useEffect, useState } from "react";
import { TransactionModal } from "@/components/modals/transaction-modal";
import { CategoryModal } from "@/components/modals/category-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <TransactionModal />
      <CategoryModal />
    </>
  );
};

export default ModalProvider;
