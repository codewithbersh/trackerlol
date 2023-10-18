import { getCurrentUser } from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(_req: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse("User is required", { status: 401 });
  }

  const res = await prismadb.user.delete({
    where: {
      id: user.id,
    },
  });

  return NextResponse.json(res);
}
