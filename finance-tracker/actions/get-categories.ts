import { redirect } from "next/navigation";
import { getCurrentUser } from "./get-current-user";
import prismadb from "@/lib/prismadb";

export const getCategories = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/login");
  }
  return await prismadb.category.findMany({
    where: {
      userId: user.id,
    },
  });
};
