import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return new NextResponse("Email is required", { status: 401 });
  }

  const waitlist = await prismadb.waitlist.create({
    data: {
      email,
    },
  });

  return NextResponse.json(waitlist);
}
