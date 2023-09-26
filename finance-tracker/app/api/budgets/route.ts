import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  const { type, amount, timeFrame, startDate, categoryId } = await req.json();

  if (!type) {
    return new NextResponse("Type is required", { status: 401 });
  }
  if (!amount) {
    return new NextResponse("Amount is required", { status: 401 });
  }
  if (!timeFrame) {
    return new NextResponse("Time Frame is required", { status: 401 });
  }

  if (!startDate) {
    return new NextResponse("Start Date is required", { status: 401 });
  }

  const budget = await prismadb.budget.create({
    data: {
      userId: user.id,
      type,
      amount,
      timeFrame,
      startDate: new Date(startDate),
      categoryId,
    },
  });

  return NextResponse.json(budget);
}

export async function GET(_req: Request) {
  const user = await getCurrentUser();

  const budgets = await prismadb.budget.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return NextResponse.json(budgets);
}
