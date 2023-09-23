import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  const { type, note, date, categoryId, amount } = await req.json();

  if (!type) {
    return new NextResponse("Type is required", { status: 401 });
  }
  if (!date) {
    return new NextResponse("Date is required", { status: 401 });
  }
  if (!categoryId) {
    return new NextResponse("CategoryId is required", { status: 401 });
  }
  if (!amount) {
    return new NextResponse("Amount is required", { status: 401 });
  }
  const transaction = await prismadb.transaction.create({
    data: {
      userId: user.id,
      type,
      note,
      date,
      categoryId,
      amount,
    },
  });

  return NextResponse.json(transaction);
}
