import { categoryCaller } from "@/trpc/routers/category";

import { CategoriesClient } from "./categories-client";

export const Categories = async () => {
  const categories = await categoryCaller.getByCount({});

  return (
    <div>
      <CategoriesClient initialData={categories} />
    </div>
  );
};
