import { getCurrentUser } from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params: { categoryId } }: { params: { categoryId: string } }
) {
  const user = await getCurrentUser();
  const { emoji, title, color, type } = await req.json();

  if (!user) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  if (!type) {
    return new NextResponse("Type is required", { status: 401 });
  }
  if (!title) {
    return new NextResponse("Title is required", { status: 401 });
  }
  if (!emoji) {
    return new NextResponse("Emoji is required", { status: 401 });
  }
  if (!color) {
    return new NextResponse("Color is required", { status: 401 });
  }

  const categoryByUserId = await prismadb.category.findFirst({
    where: {
      id: categoryId,
      userId: user.id,
    },
  });

  if (!categoryByUserId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const category = await prismadb.category.update({
    where: {
      id: categoryId,
    },
    data: {
      emoji,
      title,
      color,
      type,
    },
  });

  return NextResponse.json(category);
}

export async function DELETE(
  req: Request,
  { params: { categoryId } }: { params: { categoryId: string } }
) {
  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  const categoryByUserId = await prismadb.category.findFirst({
    where: {
      id: categoryId,
      userId: user.id,
    },
  });

  if (!categoryByUserId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const category = await prismadb.category.delete({
    where: {
      id: categoryId,
    },
  });

  return NextResponse.json(category);
}
