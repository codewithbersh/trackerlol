import prismadb from "@/lib/prismadb";
import { privateProcedure, router } from "./trpc";
import { z } from "zod";
import {
  validateDateParams,
  validateTypeParams,
} from "@/app/(dashboard)/transactions/_components/utils";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  getTransactions: privateProcedure
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
  addTransaction: privateProcedure
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
  updateTransaction: privateProcedure
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
  deleteTransaction: privateProcedure
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

  getProfile: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    const user = await prismadb.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });

    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return user.profile;
  }),
  getCategories: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    const categories = await prismadb.category.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    const expense = categories.filter(
      (category) => category.type === "EXPENSE",
    );
    const income = categories.filter((category) => category.type === "INCOME");

    return { income, expense, categories };
  }),
});

export type AppRouter = typeof appRouter;
