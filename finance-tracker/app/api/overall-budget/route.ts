import { getCurrentUser } from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await getCurrentUser();

  const { limit, duration, weekStartDay, monthStartDate, yearStartDate } =
    await req.json();

  if (!user) {
    return new NextResponse("User is required", { status: 401 });
  }

  if (!limit) {
    return new NextResponse("limit is required", { status: 401 });
  }
  if (!duration) {
    return new NextResponse("duration is required", { status: 401 });
  }

  const hasOverallBudget = await prismadb.overallBudget.findFirst();

  if (hasOverallBudget) {
    return new NextResponse("Only one overall budget is allowed.", {
      status: 401,
    });
  }

  const overallBudget = await prismadb.overallBudget.create({
    data: {
      userId: user.id,
      limit,
      duration,
      weekStartDay,
      monthStartDate: Number(monthStartDate),
      yearStartDate,
    },
  });

  return NextResponse.json(overallBudget);
}
