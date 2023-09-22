import { getCurrentUser } from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import slugify from "@sindresorhus/slugify";

export async function POST(req: Request) {
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

  const emojiExists = await prismadb.category.findFirst({
    where: {
      userId: user.id,
      emoji,
    },
  });

  const colorExists = await prismadb.category.findFirst({
    where: {
      userId: user.id,
      color,
    },
  });

  if (emojiExists) {
    return new NextResponse("Emoji has been used.", { status: 401 });
  }

  if (colorExists) {
    return new NextResponse("Color has been used.", { status: 401 });
  }

  const category = await prismadb.category.create({
    data: {
      userId: user.id,
      type,
      title,
      emoji,
      color,
      slug: slugify(title),
    },
  });

  return NextResponse.json(category);
}

export async function GET(_req: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  const categories = await prismadb.category.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return NextResponse.json(categories);
}
