"use client";

import { ImagePlus } from "lucide-react";
import { useReceiptModal } from "@/hooks/use-receipt-modal";

import { Button } from "./ui/button";

export const ReceiptButton = () => {
  const { onOpen, setReceipt } = useReceiptModal();
  return (
    <Button
      className="w-fit gap-2 h-fit min-h-[43.62px] mx-auto border-border border font-bold"
      variant="secondary"
      onClick={() => {
        setReceipt(null);
        onOpen();
      }}
    >
      <ImagePlus className="w-4 h-4 shrink-0" />
      Upload Receipt
    </Button>
  );
};
