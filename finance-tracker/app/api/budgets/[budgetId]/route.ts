import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params: { budgetId } }: { params: { budgetId: string } }
) {
  const user = await getCurrentUser();
  const { type, categoryId, amount, timeFrame, startDate } = await req.json();

  if (!type) {
    return new NextResponse("Type is required", { status: 401 });
  }
  if (!amount) {
    return new NextResponse("amount is required", { status: 401 });
  }
  if (!timeFrame) {
    return new NextResponse("timeFrame is required", { status: 401 });
  }
  if (!startDate) {
    return new NextResponse("startDate is required", { status: 401 });
  }

  const budget = await prismadb.budget.update({
    where: {
      id: budgetId,
      userId: user.id,
    },
    data: {
      type,
      amount,
      categoryId,
      timeFrame,
      startDate: new Date(startDate),
    },
  });

  return NextResponse.json(budget);
}

export async function DELETE(
  req: Request,
  { params: { budgetId } }: { params: { budgetId: string } }
) {
  const user = await getCurrentUser();

  const budget = await prismadb.budget.delete({
    where: {
      id: budgetId,
      userId: user.id,
    },
  });

  return NextResponse.json(budget);
}
