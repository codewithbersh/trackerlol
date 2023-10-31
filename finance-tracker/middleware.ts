export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/transactions",
    "/analytics",
    "/budgets",
    "/receipts",
    "/settings",
    "/categories",
  ],
};
