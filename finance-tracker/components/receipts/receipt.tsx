"use client";

import Image from "next/image";
import { useReceiptModal } from "@/hooks/use-receipt-modal";
import { Receipt as ReceiptType } from "@prisma/client";

interface ReceiptProps {
  receipt: ReceiptType;
}

export const Receipt = ({ receipt }: ReceiptProps) => {
  const { onOpen, setReceipt } = useReceiptModal();
  return (
    <div
      className="rounded-md border-input border p-2 group cursor-pointer space-y-2"
      onClick={() => {
        setReceipt(receipt);
        onOpen();
      }}
    >
      <div className="w-full font-medium text-sm leading-none">
        {receipt.title.length > 1 ? (
          receipt.title
        ) : (
          <span className="text-muted-foreground">No title</span>
        )}
      </div>
      <div className="relative aspect-square overflow-hidden rounded-md">
        <Image
          fill
          sizes="50vw"
          src={receipt.imageUrl}
          alt="Image"
          className=" object-cover  group-hover:scale-105 transition-all duration-300 ease-in-out grayscale group-hover:grayscale-0"
        />
      </div>
    </div>
  );
};
