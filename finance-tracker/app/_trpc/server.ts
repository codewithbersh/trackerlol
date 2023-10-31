import "server-only";

import { appRouter } from "@/trpc";

export const serverTrpc = appRouter.createCaller({});
