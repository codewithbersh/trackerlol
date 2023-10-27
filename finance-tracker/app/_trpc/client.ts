import { AppRouter } from "@/trpc";
import { createTRPCReact } from "@trpc/react-query";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export const trpc = createTRPCReact<AppRouter>({});

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type TransactionWithCategory = RouterOutput["getTransactions"][number];
export type UserProfile = RouterOutput["getProfile"];
export type Categories = RouterOutput["getCategories"];
