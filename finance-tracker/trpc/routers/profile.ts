import prismadb from "@/lib/prismadb";
import { privateProcedure, router } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const profileRouter = router({
  get: privateProcedure.query(async ({ ctx }) => {
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
  add: privateProcedure
    .input(
      z.object({
        id: z.string().optional(),
        currency: z.string(),
        thousandsGroupStyle: z.string(),
        displayCents: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { id, currency, thousandsGroupStyle, displayCents } = input;

      try {
        if (id) {
          await prismadb.profile.update({
            where: {
              userId,
              id,
            },
            data: {
              userId,
              currency,
              thousandsGroupStyle,
              displayCents,
            },
          });
        } else {
          await prismadb.profile.create({
            data: {
              userId,
              currency,
              thousandsGroupStyle,
              displayCents,
            },
          });
        }

        return { code: 200 as const, message: "Profile updated." };
      } catch (error) {
        return { code: 500 as const, message: "Internal Server Error." };
      }
    }),
});
