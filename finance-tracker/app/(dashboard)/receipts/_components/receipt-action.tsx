"use client";

import { useReceiptModal } from "@/hooks/use-receipt-modal";
import { Receipt } from "@prisma/client";
import { Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ReceiptActionProps {
  receipt: Receipt;
}

export const ReceiptAction = ({ receipt }: ReceiptActionProps) => {
  const { onOpen, setReceipt } = useReceiptModal();
  return (
    <Button
      variant="ghost"
      onClick={() => {
        setReceipt(receipt);
        onOpen();
      }}
    >
      <Settings2 className="h-4 w-4" />
    </Button>
  );
};
