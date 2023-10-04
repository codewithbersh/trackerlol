import { cache } from "react";
import { getCurrentUser } from "./get-current-user";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export const getCategoriesBudget = cache(async () => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  return await prismadb.categoryBudget.findMany({
    where: {
      userId: user.id,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
});
