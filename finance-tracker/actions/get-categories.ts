import { getCurrentUser } from "./get-current-user";
import prismadb from "@/lib/prismadb";
import { cache } from "react";

export const getCategories = cache(async () => {
  const user = await getCurrentUser();

  const categories = await prismadb.category.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const expense = categories.filter((category) => category.type === "EXPENSE");
  const income = categories.filter((category) => category.type === "INCOME");

  return { income, expense, categories };
});
