import { getCurrentUser } from "./get-current-user";
import prismadb from "@/lib/prismadb";
import { cache } from "react";

interface GetReceiptsProps {
  categorySlug: string | undefined;
}

export const getReceipts = cache(async ({ categorySlug }: GetReceiptsProps) => {
  const user = await getCurrentUser();

  if (categorySlug) {
    return await prismadb.receipt.findMany({
      where: {
        userId: user.id,
        category: {
          slug: categorySlug,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        category: true,
      },
    });
  } else {
    return await prismadb.receipt.findMany({
      where: {
        userId: user.id,
        category: {
          is: null,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        category: true,
      },
    });
  }
});
