"use client";

import Link from "next/link";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { Category as CategoryType } from "@prisma/client";
import { Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CategoryProps {
  category: CategoryType;
  count: number;
}

export const Category = ({ category, count }: CategoryProps) => {
  const { setCategory, onOpen } = useCategoryModal();
  return (
    <div className="col-span-full rounded-md border p-4 sm:col-span-6 md:col-span-4">
      <div className="flex items-center gap-4">
        <div
          className="grid h-10 w-10 shrink-0 place-items-center rounded-md"
          style={{ backgroundColor: category.color }}
        >
          <span className="text-xl leading-none">{category.emoji}</span>
        </div>

        <div className="flex flex-col gap-1 ">
          <div className="font-semibold leading-none">{category.title}</div>
          <Button
            asChild
            variant="link"
            className="h-fit p-0 pr-2 font-normal text-muted-foreground underline hover:text-primary"
          >
            <Link
              className=" line-clamp-1 text-muted-foreground"
              href={`/transactions?categoryId=${category.id}`}
            >
              ({count}) transaction{count !== 1 && "s"}
            </Link>
          </Button>
        </div>
        <Button
          variant="ghost"
          className="ml-auto"
          onClick={() => {
            setCategory(category);
            onOpen();
          }}
        >
          <Settings2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
