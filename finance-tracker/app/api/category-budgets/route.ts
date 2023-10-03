import { getCurrentUser } from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await getCurrentUser();

  const {
    limit,
    duration,
    weekStartDay,
    monthStartDate,
    yearStartDate,
    categoryId,
  } = await req.json();

  if (!user) {
    return new NextResponse("User is required", { status: 401 });
  }

  if (!limit) {
    return new NextResponse("limit is required", { status: 401 });
  }
  if (!duration) {
    return new NextResponse("duration is required", { status: 401 });
  }
  if (!categoryId) {
    return new NextResponse("categoryId is required", { status: 401 });
  }

  const categoryBudget = await prismadb.categoryBudget.create({
    data: {
      userId: user.id,
      categoryId,
      limit,
      duration,
      weekStartDay,
      monthStartDate: Number(monthStartDate),
      yearStartDate,
    },
  });

  return NextResponse.json(categoryBudget);
}

export async function GET(_req: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse("User is required", { status: 401 });
  }

  const categoryBudgets = await prismadb.categoryBudget.findMany({
    where: {
      userId: user.id,
    },
  });

  return NextResponse.json(categoryBudgets);
}
