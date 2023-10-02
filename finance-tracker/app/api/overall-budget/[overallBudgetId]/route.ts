import { getCurrentUser } from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params: { overallBudgetId } }: { params: { overallBudgetId: string } },
) {
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

  const overallBudget = await prismadb.overallBudget.update({
    where: {
      id: overallBudgetId,
      userId: user.id,
    },
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

export async function DELETE(
  _req: Request,
  { params: { overallBudgetId } }: { params: { overallBudgetId: string } },
) {
  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse("User is required", { status: 401 });
  }

  const overallBudget = await prismadb.overallBudget.delete({
    where: {
      userId: user.id,
      id: overallBudgetId,
    },
  });

  return NextResponse.json(overallBudget);
}
