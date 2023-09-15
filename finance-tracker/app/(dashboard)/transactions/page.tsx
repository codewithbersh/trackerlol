import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/get-current-user";

import { TransactionsClient } from "./client";

const TransactionsPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return (
    <div className="h-screen grid place-items-center">
      <TransactionsClient />
    </div>
  );
};

export default TransactionsPage;
