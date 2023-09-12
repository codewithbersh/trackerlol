"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTransactionModal } from "@/hooks/use-transaction-modal";

interface TransactionButtonProps {
  tooltipSide: "right" | "top";
  className?: string;
}

export const TransactionButton = ({ className }: TransactionButtonProps) => {
  const { onOpen } = useTransactionModal();
  return (
    <Button
      className={cn("h-10 w-10 rounded-full", className)}
      onClick={onOpen}
    >
      <Plus className="shrink-0" />
    </Button>
  );
};
