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
  add: privateProcedure
    .input(
      z.object({
        imageUrl: z.string(),
        transactionId: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { imageUrl, transactionId } = input;

      try {
        const receipt = await prismadb.receipt.create({
          data: {
            userId,
            imageUrl,
            transactionId,
          },
        });

        return { code: 200 as const, message: "Receipt added.", receipt };
      } catch (error) {
        return { code: 500 as const, message: "Internal Server Error" };
      }
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.string(),
        imageUrl: z.string(),
        transactionId: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { id, imageUrl, transactionId } = input;

      try {
        const receipt = await prismadb.receipt.update({
          where: {
            id,
          },
          data: {
            userId,
            imageUrl,
            transactionId,
          },
        });

        return { code: 200 as const, message: "Receipt added.", receipt };
      } catch (error) {
        return { code: 500 as const, message: "Internal Server Error" };
      }
    }),
  delete: privateProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { id } = input;

      try {
        await prismadb.receipt.delete({
          where: {
            userId,
            id,
          },
        });

        return { code: 200 as const, message: "Receipt deleted." };
      } catch (error) {
        return { code: 500 as const, message: "Internal Server Error." };
      }
    }),
});
