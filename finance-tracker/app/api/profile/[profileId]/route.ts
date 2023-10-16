import { getCurrentUser } from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params: { profileId } }: { params: { profileId: string } },
) {
  const user = await getCurrentUser();
  const { currency, thousandsGroupStyle } = await req.json();

  if (!user) {
    return new NextResponse("User is required", { status: 401 });
  }

  if (!currency) {
    return new NextResponse("currency is required", { status: 404 });
  }

  if (!thousandsGroupStyle) {
    return new NextResponse("thousandsGroupStyle is required", { status: 404 });
  }

  const profile = await prismadb.profile.update({
    where: {
      id: profileId,
    },
    data: {
      currency,
      thousandsGroupStyle,
    },
  });

  return NextResponse.json(profile);
}
