"use client";

import { Folder, Undo2 } from "lucide-react";
import { CategoryWithReceiptCount } from "@/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterReceiptDropdownProps {
  categories: {
    income: CategoryWithReceiptCount[];
    expense: CategoryWithReceiptCount[];
    categories: CategoryWithReceiptCount[];
  };
}

export const FilterReceiptDropdown = ({
  categories,
}: FilterReceiptDropdownProps) => {
  const router = useRouter();
  const categoryParams = useSearchParams().get("category");

  const onItemSelect = ({ slug }: { slug: string }) => {
    router.push(`/receipts?category=${slug}`);
  };

  const paramsIsValid = categories.categories.some(
    (category) => category.slug === categoryParams?.toLowerCase()
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center w-fit gap-4 outline-none ring-none group bg-secondary px-4 py-2 rounded-md">
          <Folder className="w-4 h-4" />
          <span className="font-mono font-bold leading-none text-sm group-hover:underline underline-offset-4">
            ~/{" "}
            {paramsIsValid && (
              <span className="text-primary">{categoryParams}</span>
            )}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={12}>
        {paramsIsValid && (
          <>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onSelect={() => router.push("/receipts")}
            >
              <div className="w-4 h-4 grid place-items-center">
                <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-300 via-fuchsia-600 to-orange-600 w-2 h-2 rounded-full" />
              </div>

              <span>Root</span>
              <Undo2 className="w-3 h-3 ml-auto" />
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
            className={cn(
              "flex items-center gap-2",
              categoryParams?.toLowerCase() === category.slug && "bg-accent"
            )}
            onSelect={() => onItemSelect({ slug: category.slug })}
          >
            <div className="w-4 h-4 grid place-items-center">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: category.color }}
              />
            </div>
            <div className="flex gap-2 w-full justify-between">
              <span>{category.title} </span>

              <span>({category._count.receipts})</span>
            </div>
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
            onSelect={() => onItemSelect({ slug: category.slug })}
          >
            <div className="w-4 h-4 grid place-items-center">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: category.color }}
              />
            </div>
            <div className="flex gap-2 w-full justify-between">
              <span>{category.title} </span>

              <span>({category._count.receipts})</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
