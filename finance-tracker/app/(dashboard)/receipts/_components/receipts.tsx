"use client";

import { Receipt } from "./receipt";
import { trpc } from "@/app/_trpc/client";

interface ReceiptsProps {
  categoryId: string | undefined;
}

export const Receipts = ({ categoryId }: ReceiptsProps) => {
  const { data: receipts } = trpc.receipt.get.all.useQuery(
    { categoryId },
    {
      staleTime: Infinity,
    },
  );

  if (receipts?.length === 0 || !receipts) {
    return (
      <div className=" w-full py-12 text-center text-sm text-muted-foreground">
        No receipts.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      {receipts.map((receipt) => (
        <Receipt
          receipt={receipt}
          key={receipt.id}
          className="col-span-full rounded-md border p-4 sm:col-span-6 md:col-span-4"
        />
      ))}
    </div>
  );
};
