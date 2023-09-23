import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return session.user;
}
