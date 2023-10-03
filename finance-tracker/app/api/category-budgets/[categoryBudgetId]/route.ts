import { getCurrentUser } from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params: { categoryBudgetId } }: { params: { categoryBudgetId: string } },
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

  const categoryBudget = await prismadb.categoryBudget.update({
    where: {
      id: categoryBudgetId,
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

  return NextResponse.json(categoryBudget);
}

export async function DELETE(
  _req: Request,
  { params: { categoryBudgetId } }: { params: { categoryBudgetId: string } },
) {
  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse("User is required", { status: 401 });
  }

  const categoryBudget = await prismadb.categoryBudget.delete({
    where: {
      userId: user.id,
      id: categoryBudgetId,
    },
  });

  return NextResponse.json(categoryBudget);
}
