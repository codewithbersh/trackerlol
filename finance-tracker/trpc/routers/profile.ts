import prismadb from "@/lib/prismadb";
import { privateProcedure, router } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";

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
});
