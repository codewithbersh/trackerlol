import { WaitlistTemplate } from "@/components/email/waitlist-template";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return new NextResponse("Email is required", { status: 401 });
  }

  try {
    const inWaitlist = await prismadb.waitlist.findFirst({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (inWaitlist) {
      return NextResponse.json(inWaitlist);
    }

    const waitlist = await prismadb.waitlist.create({
      data: {
        email,
      },
    });

    await resend.emails.send({
      from: "tracker@brucesalcedo.com",
      to: email,
      subject: "Welcome to Tracker - The Finance Tracker for the Web",
      react: WaitlistTemplate({ email: email }) as React.ReactElement,
    });

    return NextResponse.json(waitlist);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
