import { getCurrentUser } from "./get-current-user";
import prismadb from "@/lib/prismadb";
import { cache } from "react";

export const getReceipts = cache(async () => {
  const user = await getCurrentUser();

  return await prismadb.receipt.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
});
