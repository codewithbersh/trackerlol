import { getCurrentUser } from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  const { currency, thousandsGroupStyle, displayCents } = await req.json();

  if (!user) {
    return new NextResponse("User is required", { status: 401 });
  }

  if (!currency) {
    return new NextResponse("currency is required", { status: 404 });
  }

  if (!thousandsGroupStyle) {
    return new NextResponse("thousandsGroupStyle is required", { status: 404 });
  }

  const profile = await prismadb.profile.create({
    data: {
      userId: user.id,
      currency,
      thousandsGroupStyle,
      displayCents,
    },
  });

  return NextResponse.json(profile);
}

export async function GET(_req: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse("User is required", { status: 401 });
  }

  const profile = await prismadb.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  return NextResponse.json(profile);
}
