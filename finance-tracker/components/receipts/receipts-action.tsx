"use client";

import { Plus } from "lucide-react";
import { useReceiptModal } from "@/hooks/use-receipt-modal";

import { Button } from "@/components/ui/button";

export const ReceiptsAction = () => {
  const { onOpen, setReceipt } = useReceiptModal();
  return (
    <Button
      className="gap-2"
      onClick={() => {
        setReceipt(null);
        onOpen();
      }}
    >
      <Plus className="h-4 w-4" />
      <div>
        Add <span className="hidden sm:inline"> Receipt</span>
      </div>
    </Button>
  );
};
