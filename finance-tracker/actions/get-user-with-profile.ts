import { cache } from "react";
import { getCurrentUser } from "./get-current-user";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export const getUserWithProfile = cache(async () => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const userWithProfile = await prismadb.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      profile: true,
    },
  });

  if (!userWithProfile) {
    return redirect("/login");
  }

  return userWithProfile;
});
