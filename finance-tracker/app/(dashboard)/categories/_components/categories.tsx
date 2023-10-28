import { TransactionType } from "@prisma/client";
import { serverClient } from "@/app/_trpc/server";

import { CategoriesClient } from "./categories-client";

interface CategoriesProps {
  type: TransactionType | undefined;
}

export const Categories = async ({ type }: CategoriesProps) => {
  const categories = await serverClient.category.getByCount({ type });

  if (!categories || categories.length === 0) {
    return (
      <div className="grid w-full place-items-center py-12 text-sm text-muted-foreground">
        No categories.
      </div>
    );
  }

  return <CategoriesClient categories={categories} type={type} />;
};
