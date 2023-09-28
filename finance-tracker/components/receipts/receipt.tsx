"use client";

import Image from "next/image";
import { useReceiptModal } from "@/hooks/use-receipt-modal";
import { Folder, FolderInput, MoreHorizontal, Settings2 } from "lucide-react";
import { CategoryWithReceiptCount, ReceiptWithCategory } from "@/types/types";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ReceiptProps {
  receipt: ReceiptWithCategory;
  categories: {
    expense: CategoryWithReceiptCount[];
    income: CategoryWithReceiptCount[];
    categories: CategoryWithReceiptCount[];
  };
}

export const Receipt = ({ receipt, categories }: ReceiptProps) => {
  const { onOpen, setReceipt } = useReceiptModal();
  const router = useRouter();

  const handleUpdateReceipt = async (categoryId: string | null) => {
    try {
      await axios.patch(`/api/receipts/${receipt.id}`, { categoryId });
      router.refresh();
      toast.success("Receipt has been moved.");
    } catch (error) {
      console.log("[UPDATE_RECEIPT_ERROR]", error);
      toast.error("An error has occured.");
    }
  };

  return (
    <div className="rounded-md border-input border p-2 group cursor-pointer space-y-2">
      <div className="w-full font-medium text-sm leading-none flex justify-between gap-4 items-center">
        {receipt.title.length > 1 ? (
          <span>{receipt.title}</span>
        ) : (
          <span className="text-muted-foreground">No title</span>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 h-fit w-fit rounded-md"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2">
                <FolderInput className="w-4 h-4" />
                <span>Move to</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {receipt.categoryId && (
                    <>
                      <DropdownMenuItem
                        onSelect={() => handleUpdateReceipt(null)}
                        className="flex items-center gap-2"
                      >
                        <div className="w-4 h-4 grid place-items-center">
                          <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-300 via-fuchsia-600 to-orange-600 w-2 h-2 rounded-full" />
                        </div>
                        Move to root
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}

                  <DropdownMenuLabel className="flex items-center gap-2">
                    <Folder className="w-4 h-4" />
                    <span>Expense</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories.expense.map((category) => (
                    <DropdownMenuItem
                      key={category.id}
                      className="flex items-center gap-2"
                      onSelect={() => handleUpdateReceipt(category.id)}
                    >
                      <div className="w-4 h-4 grid place-items-center">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                      </div>
                      <span>{category.title} </span>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <Folder className="w-4 h-4" />
                    <span>Income</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories.income.map((category) => (
                    <DropdownMenuItem
                      key={category.id}
                      className="flex items-center gap-2"
                      onSelect={() => handleUpdateReceipt(category.id)}
                    >
                      <div className="w-4 h-4 grid place-items-center">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                      </div>
                      <span>{category.title} </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem
              className="gap-2 items-center"
              onSelect={() => {
                setReceipt(receipt);
                onOpen();
              }}
            >
              <Settings2 className="w-4 h-4" />
              <span>Edit</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div
        className="relative aspect-square overflow-hidden rounded-md"
        onClick={() => {
          setReceipt(receipt);
          onOpen();
        }}
      >
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
