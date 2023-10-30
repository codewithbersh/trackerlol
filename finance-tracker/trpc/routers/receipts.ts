import { z } from "zod";
import { privateProcedure, router } from "../trpc";
import prismadb from "@/lib/prismadb";

export const receiptRouter = router({
  get: router({
    all: privateProcedure
      .input(
        z.object({
          categoryId: z.string().optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { userId } = ctx;
        const { categoryId } = input;

        return await prismadb.receipt.findMany({
          where: {
            userId,
            transaction: {
              categoryId,
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
      }),
  }),
});
