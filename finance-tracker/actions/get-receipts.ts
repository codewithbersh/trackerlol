import { getCurrentUser } from "./get-current-user";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { cache } from "react";

interface GetReceiptsProps {
  category: string | undefined;
}

export const getReceipts = cache(async ({ category }: GetReceiptsProps) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return await prismadb.receipt.findMany({
    where: {
      userId: user.id,
      transaction: {
        category: {
          slug: category,
        },
      },
    },
    include: {
      transaction: {
        include: {
          category: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
});
