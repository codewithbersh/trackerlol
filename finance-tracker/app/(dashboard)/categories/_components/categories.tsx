"use client";

import { trpc } from "@/app/_trpc/client";
import { validateTypeParams } from "@/app/(dashboard)/transactions/_components/utils";

import { Spinner } from "@/components/spinner";
import { Category } from "./category";

export const Categories = ({ type }: { type: string | undefined }) => {
  const { data: categories, isLoading } = trpc.category.getByCount.useQuery(
    { type: validateTypeParams(type) },
    {
      staleTime: Infinity,
    },
  );

  if (isLoading) {
    return <Spinner className="py-12 md:py-24" />;
  }

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
