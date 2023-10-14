import { cache } from "react";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { getCurrentUser } from "./get-current-user";

interface GetReceiptsProps {
  category: string | undefined;
}

export const getReceipts = cache(async ({ category }: GetReceiptsProps) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (category) {
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
  }

  return await prismadb.receipt.findMany({
    where: {
      userId: user.id,
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
