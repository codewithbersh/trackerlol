import { getReceipts } from "@/actions/get-receipts";

import { Receipt } from "./receipt";

interface ReceiptsProps {
  searchParams: { [key: string]: string | undefined };
}

export const Receipts = async ({ searchParams }: ReceiptsProps) => {
  const receipts = await getReceipts({ category: searchParams.category });

  if (receipts.length === 0) {
    return (
      <div className="grid w-full place-items-center py-8 text-sm text-muted-foreground">
        No receipt found.
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
