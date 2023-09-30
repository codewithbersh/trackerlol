import { getCurrentUser } from "./get-current-user";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getCategories = cache(async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

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

export const getCategoriesWithReceiptCount = cache(async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const categories = await prismadb.category.findMany({
    where: {
      userId: user.id,
    },

    orderBy: {
      updatedAt: "desc",
    },
    select: {
      id: true,
      title: true,
      color: true,
      type: true,
      slug: true,
      _count: {
        select: {
          receipts: true,
        },
      },
    },
  });

  const expense = categories.filter((category) => category.type === "EXPENSE");
  const income = categories.filter((category) => category.type === "INCOME");

  return { income, expense, categories };
});
