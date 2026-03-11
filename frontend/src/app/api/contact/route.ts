import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    // TODO: Integrate with actual email service (Resend, SendGrid, etc.)
    // For now, log the contact form submission
    // In production, this will send to info@entersolutions.io
    console.log("Contact form submission:", {
      to: "info@entersolutions.io",
      from: email,
      name,
      company: company || "N/A",
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
