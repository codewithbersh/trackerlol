"use client";

import { useEffect, useState } from "react";
import { TransactionModal } from "@/components/modals/transaction-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <TransactionModal />
    </>
  );
};

export default ModalProvider;
