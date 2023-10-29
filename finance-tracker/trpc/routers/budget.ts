import { getBudgetDateRange } from "@/app/(dashboard)/budgets/_components/utils";
import prismadb from "@/lib/prismadb";
import { privateProcedure, router } from "@/trpc/trpc";
import { z } from "zod";

export const budgetRouter = router({
  overall: router({
    get: privateProcedure.query(async ({ ctx }) => {
      const { userId } = ctx;

      const overall = await prismadb.overallBudget.findUnique({
        where: {
          userId,
        },
      });

      if (overall) {
        const { from, to } = getBudgetDateRange({ budget: overall });

        const total = await prismadb.transaction.aggregate({
          where: {
            userId,
            date: {
              gte: from,
              lt: to,
            },
            type: "EXPENSE",
          },
          _sum: {
            amount: true,
          },
        });

        return {
          budget: { ...overall, limit: Number(overall.limit) },
          total: total._sum.amount ? Number(total._sum.amount) : 0,
          range: { from, to },
        };
      }

      return null;
    }),
    add: privateProcedure
      .input(
        z.object({
          limit: z.number(),
          duration: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
          weekStartDay: z
            .enum([
              "SUNDAY",
              "MONDAY",
              "TUESDAY",
              "WEDNESDAY",
              "THURSDAY",
              "FRIDAY",
              "SATURDAY",
            ])
            .optional(),
          monthStartDate: z.string().optional(),
          yearStartDate: z.date().optional(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { userId } = ctx;
        const { limit, duration, weekStartDay, monthStartDate, yearStartDate } =
          input;

        try {
          await prismadb.overallBudget.create({
            data: {
              userId,
              limit,
              duration,
              weekStartDay,
              monthStartDate: Number(monthStartDate),
              yearStartDate,
            },
          });

          return { code: 200 as const, message: "Budget Created." };
        } catch (error) {
          return { code: 500 as const, message: "Internal Server Error." };
        }
      }),
  }),
  categories: router({
    getAll: privateProcedure.query(async ({ ctx }) => {
      const { userId } = ctx;

      const budgets = await prismadb.categoryBudget.findMany({
        where: {
          userId,
        },
        include: {
          category: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const formattedBudgets = budgets.map((budget) => {
        return { ...budget, limit: Number(budget.limit) };
      });

      return formattedBudgets;
    }),
    add: privateProcedure
      .input(
        z.object({
          limit: z.number(),
          duration: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
          weekStartDay: z
            .enum([
              "SUNDAY",
              "MONDAY",
              "TUESDAY",
              "WEDNESDAY",
              "THURSDAY",
              "FRIDAY",
              "SATURDAY",
            ])
            .optional(),
          monthStartDate: z.string().optional(),
          yearStartDate: z.date().optional(),
          categoryId: z.string(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { userId } = ctx;
        const {
          limit,
          duration,
          weekStartDay,
          monthStartDate,
          yearStartDate,
          categoryId,
        } = input;

        try {
          await prismadb.categoryBudget.create({
            data: {
              userId,
              limit,
              duration,
              weekStartDay,
              monthStartDate: Number(monthStartDate),
              yearStartDate,
              categoryId,
            },
          });

          return { code: 200 as const, message: "Budget Created." };
        } catch (error) {
          return { code: 500 as const, message: "Internal Server Error." };
        }
      }),
    update: privateProcedure
      .input(
        z.object({
          id: z.string(),
          limit: z.number(),
          duration: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
          weekStartDay: z
            .enum([
              "SUNDAY",
              "MONDAY",
              "TUESDAY",
              "WEDNESDAY",
              "THURSDAY",
              "FRIDAY",
              "SATURDAY",
            ])
            .optional(),
          monthStartDate: z.string().optional(),
          yearStartDate: z.date().optional(),
          categoryId: z.string(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { userId } = ctx;
        const {
          id,
          limit,
          duration,
          weekStartDay,
          monthStartDate,
          yearStartDate,
          categoryId,
        } = input;

        try {
          await prismadb.categoryBudget.update({
            where: {
              id,
              userId,
            },
            data: {
              limit,
              duration,
              weekStartDay,
              monthStartDate: Number(monthStartDate),
              yearStartDate,
              categoryId,
            },
          });

          return { code: 200 as const, message: "Budget Updated." };
        } catch (error) {
          return { code: 500 as const, message: "Internal Server Error." };
        }
      }),
  }),
});

export const budgetCaller = budgetRouter.createCaller({});
