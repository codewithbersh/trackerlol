import { cache } from "react";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { getCurrentUser } from "./get-current-user";

export const getOverallBudget = cache(async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return await prismadb.overallBudget.findUnique({
    where: {
      userId: user.id,
    },
  });
});
