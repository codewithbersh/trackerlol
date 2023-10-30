"use client";

import { trpc } from "@/app/_trpc/client";
import { validateTypeParams } from "../../transactions/_components/utils";

import { Category } from "./category";

export const Categories = ({ type }: { type: string | undefined }) => {
  const { data: categories } = trpc.category.getByCount.useQuery(
    { type: validateTypeParams(type) },
    {
      staleTime: Infinity,
    },
  );

  if (!categories || categories.length === 0) {
    return (
      <div className="grid w-full place-items-center py-12 text-sm text-muted-foreground">
        No categories.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      {categories.map((category) => (
        <Category
          category={category.category}
          count={category.count}
          key={category.category.id}
        />
      ))}
    </div>
  );
};
