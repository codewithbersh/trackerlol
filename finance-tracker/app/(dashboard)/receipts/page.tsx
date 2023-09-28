import { getCategoriesWithReceiptCount } from "@/actions/get-categories";
import { getReceipts } from "@/actions/get-receipts";

import { ReceiptButton } from "@/components/receipt-button";
import { FilterReceiptDropdown } from "@/components/receipts/filter-receipt-dropdown";
import { Receipt } from "@/components/receipts/receipt";

interface ReceiptsPageProps {
  searchParams: { [key: string]: string | undefined };
}

const ReceiptsPage = async ({ searchParams }: ReceiptsPageProps) => {
  const categories = await getCategoriesWithReceiptCount();

  const paramsIsValid = categories.categories.some(
    (category) => category.slug === searchParams.category?.toLowerCase()
  );

  const receipts = await getReceipts({
    categorySlug: paramsIsValid ? searchParams.category : undefined,
  });

  return (
    <div className="flex flex-col gap-8 py-24">
      <ReceiptButton />
      <FilterReceiptDropdown categories={categories} />
      <div className="w-full grid grid-cols-2 md:grid-cols-3 justify-between gap-4 ">
        {receipts.length === 0 && (
          <div className="w-full text-center col-span-3 text-muted-foreground py-12">
            No receipts found.
          </div>
        )}
        {receipts?.map((receipt) => (
          <Receipt receipt={receipt} key={receipt.id} categories={categories} />
        ))}
      </div>
    </div>
  );
};

export default ReceiptsPage;
