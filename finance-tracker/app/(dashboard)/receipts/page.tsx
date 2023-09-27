import { getReceipts } from "@/actions/get-receipts";

import { ReceiptButton } from "@/components/receipt-button";
import { Receipt } from "@/components/receipts/receipt";

const ReceiptsPage = async () => {
  const receipts = await getReceipts();

  return (
    <div className="flex flex-col gap-8 py-24">
      <ReceiptButton />
      <div className="w-full grid grid-cols-2 md:grid-cols-3 justify-between gap-4 mt-8">
        {receipts.map((receipt) => (
          <Receipt receipt={receipt} key={receipt.id} />
        ))}
      </div>
    </div>
  );
};

export default ReceiptsPage;
