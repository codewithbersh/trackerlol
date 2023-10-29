import { router } from "./trpc";

import { transactionRouter } from "./routers/transactions";
import { profileRouter } from "./routers/profile";
import { categoryRouter } from "./routers/category";
import { budgetRouter } from "./routers/budget";

export const appRouter = router({
  transaction: transactionRouter,
  profile: profileRouter,
  category: categoryRouter,
  budget: budgetRouter,
});

export type AppRouter = typeof appRouter;
