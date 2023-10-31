import prismadb from "@/lib/prismadb";
import { privateProcedure, router } from "@/trpc/trpc";

export const userRouter = router({
  delete: privateProcedure.mutation(async ({ ctx }) => {
    const { userId } = ctx;

    try {
      await prismadb.user.delete({
        where: {
          id: userId,
        },
      });

      return { ok: true };
    } catch (error) {
      return { ok: false };
    }
  }),
});
