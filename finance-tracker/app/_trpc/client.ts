import { AppRouter } from "@/trpc";
import { createTRPCReact } from "@trpc/react-query";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export const trpc = createTRPCReact<AppRouter>({});

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type TransactionWithCategory =
  RouterOutput["transaction"]["get"][number];
export type UserProfile = RouterOutput["profile"]["get"];
export type Categories = RouterOutput["category"]["get"];
export type CategoriesByCount = RouterOutput["category"]["getByCount"];
