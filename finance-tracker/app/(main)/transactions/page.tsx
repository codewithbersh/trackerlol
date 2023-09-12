"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const TransactionsPage = () => {
  return (
    <div>
      <Button onClick={() => signOut({ callbackUrl: "/login" })}>Logout</Button>
    </div>
  );
};

export default TransactionsPage;
