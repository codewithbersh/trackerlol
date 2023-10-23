import { cache } from "react";
import { getCurrentUser } from "./get-current-user";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { Category, TransactionType } from "@prisma/client";

interface Props {
  type: TransactionType | undefined;
}

export const getCategoriesByCount = cache(async ({ type }: Props) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const categories = await prismadb.category.findMany({
    where: {
      userId: user.id,
      type: type,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const categoriesByCount = await prismadb.transaction.groupBy({
    by: ["categoryId"],
    where: {
      userId: user!.id,
    },
    _count: true,
  });

  const formatted = categories.map((category) => {
    const count = categoriesByCount.find(
      (item) => item.categoryId === category.id,
    )?._count;
    return { category: { ...category }, count: count ?? 0 };
  });

  return formatted;
});
