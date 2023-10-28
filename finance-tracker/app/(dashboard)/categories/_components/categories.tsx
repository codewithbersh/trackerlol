"use client";

import { trpc } from "@/app/_trpc/client";
import { Category } from "./category";
import { useSearchParams } from "next/navigation";
import { validateTypeParams } from "../../transactions/_components/utils";

import { Spinner } from "@/components/spinner";

export const Categories = () => {
  const type = useSearchParams().get("type");

  const { data: categories, isLoading } = trpc.category.getByCount.useQuery(
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

  if (isLoading) {
    return <Spinner className="py-8" variant="large" />;
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
