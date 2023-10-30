import Image from "next/image";
import { cn } from "@/lib/utils";
import { CopyMinus } from "lucide-react";
import { Receipt as ReceiptType } from "@/app/_trpc/client";

import { ReceiptAction } from "./receipt-action";

interface ReceiptProps {
  receipt: NonNullable<ReceiptType>;
  className?: string;
}

export const Receipt = ({ receipt, className }: ReceiptProps) => {
  const transaction = receipt.transaction;
  const receiptWithoutTransaction = {
    id: receipt.id,
    userId: receipt.userId,
    imageUrl: receipt.imageUrl,
    transactionId: receipt.transactionId,
    createdAt: receipt.createdAt,
    updatedAt: receipt.updatedAt,
  };

  return (
    <div className={cn("group flex flex-col gap-4 bg-background", className)}>
      <div className="flex w-full justify-between gap-4">
        {transaction ? (
          <div className="flex items-center gap-4">
            <div
              className="grid h-10 w-10 place-items-center rounded-md"
              style={{ backgroundColor: transaction.category.color }}
            >
              <span className="text-xl leading-none">
                {transaction.category.emoji}
              </span>
            </div>

            <div className="flex flex-col gap-1  leading-none">
              <div className="font-semibold">{transaction.category.title}</div>
              {transaction.note.length > 0 ? (
                <div className="text-muted-foreground">{transaction.note}</div>
              ) : (
                <div className="text-muted-foreground/75">Empty</div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-accent">
              <CopyMinus className="h-6 w-6" />
            </div>
            <div className="text-sm leading-none text-muted-foreground">
              No transaction
            </div>
          </div>
        )}

        <ReceiptAction receipt={receiptWithoutTransaction} />
      </div>
      <div className="relative aspect-square overflow-hidden rounded-md">
        <Image
          fill
          sizes="50vw"
          src={receipt.imageUrl}
          alt="Image"
          className=" object-cover  grayscale transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:grayscale-0"
        />
      </div>
    </div>
  );
};
