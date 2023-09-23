import { getCurrentUser } from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params: { transactionId } }: { params: { transactionId: string } }
) {
  const user = await getCurrentUser();
  const { type, note, date, categoryId, amount } = await req.json();

  if (!user) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }
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

  const transaction = await prismadb.transaction.updateMany({
    where: {
      id: transactionId,
    },
    data: {
      type,
      note,
      date,
      categoryId,
      amount,
    },
  });
  return NextResponse.json(transaction);
}

export async function DELETE(
  _req: Request,
  { params: { transactionId } }: { params: { transactionId: string } }
) {
  const user = await getCurrentUser();

  const transaction = await prismadb.transaction.delete({
    where: {
      id: transactionId,
      userId: user.id,
    },
  });
  return NextResponse.json(transaction);
}
