import { router } from "./trpc";
import { transactionRouter } from "./routers/transactions";
import { profileRouter } from "./routers/profile";
import { categoryRouter } from "./routers/category";

export const appRouter = router({
  transaction: transactionRouter,
  profile: profileRouter,
  category: categoryRouter,
});

export type AppRouter = typeof appRouter;
