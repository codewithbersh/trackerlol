import { z } from "zod";
import { privateProcedure, router } from "@/trpc/trpc";
import prismadb from "@/lib/prismadb";
import {
  validateDateParams,
  validateTypeParams,
} from "@/app/(dashboard)/transactions/_components/utils";

export const transactionRouter = router({
  get: privateProcedure
    .input(
      z.object({
        from: z.string().optional(),
        to: z.string().optional(),
        type: z.string().optional(),
        categoryId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { from, to, type, categoryId } = input;

      const transactions = await prismadb.transaction.findMany({
        where: {
          userId,
          date: {
            gte: validateDateParams(from),
            lte: validateDateParams(to),
          },
          type: validateTypeParams(type),
          categoryId,
        },
        orderBy: {
          date: "desc",
        },
        include: {
          category: true,
        },
      });

      const formattedTransactions = transactions.map((transaction) => ({
        ...transaction,
        amount: Number(transaction.amount),
      }));

      return formattedTransactions;
    }),

  add: privateProcedure
    .input(
      z.object({
        type: z.enum(["EXPENSE", "INCOME"]),
        amount: z.number(),
        note: z.string(),
        date: z.date(),
        categoryId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { type, amount, note, date, categoryId } = input;

      try {
        await prismadb.transaction.create({
          data: {
            userId,
            type,
            note,
            date,
            categoryId,
            amount,
          },
        });

        return { success: true };
      } catch (error) {
        return { success: false };
      }
    }),

  update: privateProcedure
    .input(
      z.object({
        id: z.string(),
        type: z.enum(["EXPENSE", "INCOME"]),
        amount: z.number(),
        note: z.string(),
        date: z.date(),
        categoryId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { id, type, amount, note, date, categoryId } = input;

      try {
        await prismadb.transaction.update({
          where: {
            id,
            userId,
          },
          data: {
            type,
            note,
            date,
            categoryId,
            amount,
          },
        });
        return { success: true };
      } catch (error) {
        return { success: false };
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
        await prismadb.transaction.delete({
          where: {
            id,
            userId,
          },
        });
        return { success: true };
      } catch (error) {
        return { success: false };
      }
    }),
});
