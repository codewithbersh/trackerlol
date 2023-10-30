import { router } from "./trpc";

import { transactionRouter } from "./routers/transactions";
import { profileRouter } from "./routers/profile";
import { categoryRouter } from "./routers/category";
import { budgetRouter } from "./routers/budget";
import { analyticsRouter } from "./routers/analytics";
import { receiptRouter } from "./routers/receipts";

export const appRouter = router({
  transaction: transactionRouter,
  profile: profileRouter,
  category: categoryRouter,
  budget: budgetRouter,
  analytics: analyticsRouter,
  receipt: receiptRouter,
});

export type AppRouter = typeof appRouter;
