import { getCurrentUser } from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { utapi } from "uploadthing/server";

export async function PATCH(
  req: Request,
  { params: { receiptId } }: { params: { receiptId: string } }
) {
  const user = await getCurrentUser();
  const { imageUrl, oldImageUrl, title, categoryId } = await req.json();

  if (!user) {
    return new NextResponse("User is required", { status: 401 });
  }

  if (imageUrl !== oldImageUrl) {
    await utapi.deleteFiles(oldImageUrl.replace("https://utfs.io/f/", ""));
  }

  const receipt = await prismadb.receipt.update({
    where: {
      id: receiptId,
      userId: user.id,
    },
    data: {
      imageUrl,
      title,
      categoryId,
    },
  });

  return NextResponse.json(receipt);
}

export async function DELETE(
  _req: Request,
  { params: { receiptId } }: { params: { receiptId: string } }
) {
  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse("User is required", { status: 401 });
  }

  const receipt = await prismadb.receipt.findUnique({
    where: {
      id: receiptId,
      userId: user.id,
    },
  });

  if (!receipt) {
    return new NextResponse("Receipt not found", { status: 404 });
  }

  try {
    const res = await prismadb.receipt.delete({
      where: {
        id: receiptId,
      },
    });
    await utapi.deleteFiles(receipt.imageUrl.replace("https://utfs.io/f/", ""));
    return NextResponse.json(res);
  } catch (error) {
    console.log("[DELETE_RECEIPT_ERROR]", error);
    return new NextResponse("Internal error.", { status: 500 });
  }
}
