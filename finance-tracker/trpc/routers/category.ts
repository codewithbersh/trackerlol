import prismadb from "@/lib/prismadb";
import { privateProcedure, router } from "@/trpc/trpc";
import slugify from "@sindresorhus/slugify";
import { z } from "zod";

export const categoryRouter = router({
  get: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    return await prismadb.category.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),
  getByCount: privateProcedure
    .input(
      z.object({
        type: z.enum(["EXPENSE", "INCOME"]).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { type } = input;

      const categories = await prismadb.category.findMany({
        where: {
          userId,
          type,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const categoriesByCount = await prismadb.transaction.groupBy({
        by: ["categoryId"],
        where: {
          userId,
        },
        _count: true,
      });

      const formatted = categories.map((category) => {
        const count = categoriesByCount.find(
          (item) => item.categoryId === category.id,
        )?._count;
        return { category: { ...category }, count: count ?? 0 };
      });

      return formatted;
    }),
  add: privateProcedure
    .input(
      z.object({
        type: z.enum(["EXPENSE", "INCOME"]),
        emoji: z.string(),
        title: z.string(),
        color: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { type, emoji, title, color } = input;

      const emojiExists = await prismadb.category.findFirst({
        where: {
          userId,
          emoji,
        },
      });

      if (emojiExists) {
        return { code: 401 as const, message: "Emoji already exists." };
      }

      const colorExists = await prismadb.category.findFirst({
        where: {
          userId,
          color,
        },
      });

      if (colorExists) {
        return { code: 401 as const, message: "Color already exists." };
      }

      try {
        await prismadb.category.create({
          data: {
            userId,
            type,
            title,
            emoji,
            color,
            slug: slugify(title),
          },
        });
        return { code: 200 as const, message: "Category has been added." };
      } catch (error) {
        return { code: 500 as const, message: "Internal Server Error" };
      }
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.string(),
        type: z.enum(["EXPENSE", "INCOME"]),
        emoji: z.string(),
        title: z.string(),
        color: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { id, type, emoji, title, color } = input;

      const emojiExists = await prismadb.category.findFirst({
        where: {
          userId,
          emoji,
        },
      });

      if (emojiExists) {
        return { code: 401 as const, message: "Emoji already exists." };
      }

      const colorExists = await prismadb.category.findFirst({
        where: {
          userId,
          color,
        },
      });

      if (colorExists) {
        return { code: 401 as const, message: "Color already exists." };
      }

      try {
        await prismadb.category.update({
          where: {
            id,
            userId,
          },
          data: {
            userId,
            type,
            title,
            emoji,
            color,
            slug: slugify(title),
          },
        });
        return { code: 200 as const, message: "Category has been updated." };
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
        await prismadb.category.delete({
          where: {
            id,
            userId,
          },
        });
        return { code: 200 as const, message: "Category has been deleted." };
      } catch (error) {
        return { code: 500 as const, message: "Internal Server Error." };
      }
    }),
});
