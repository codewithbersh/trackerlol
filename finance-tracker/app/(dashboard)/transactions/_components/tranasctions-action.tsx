"use client";

import { Plus } from "lucide-react";
import { useTransactionModal } from "@/hooks/use-transaction-modal";

import { Button } from "@/components/ui/button";

export const TransactionsAction = () => {
  const { onOpen, setTransaction } = useTransactionModal();
  return (
    <div className="lg:flex lg:items-center lg:gap-4">
      <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1.5 px-1.5 font-mono font-medium text-muted-foreground opacity-100 lg:inline-flex">
        <span className="text-xl">⌘</span>J
      </kbd>
      <Button
        className="gap-2"
        onClick={() => {
          setTransaction(null);
          onOpen();
        }}
        variant="brand"
      >
        <Plus className="h-4 w-4" />
        <div>
          Add <span className="hidden sm:inline">Transaction</span>
        </div>
      </Button>
    </div>
  );
};
