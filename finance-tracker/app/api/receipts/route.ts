import { getCurrentUser } from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  const { imageUrl, title } = await req.json();

  if (!imageUrl) {
    return new NextResponse("imageUrl is required", { status: 401 });
  }

  const receipt = await prismadb.receipt.create({
    data: {
      userId: user.id,
      imageUrl,
      title,
    },
  });

  return NextResponse.json(receipt);
}
