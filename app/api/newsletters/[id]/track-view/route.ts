import { type NextRequest, NextResponse } from "next/server";
import Newsletter from "@/models/Newsletter";

export async function POST(
  request: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;

  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const newsletter = await Newsletter.findOne({ id: params.id });

    if (!newsletter) {
      return NextResponse.json(
        { error: "Newsletter not found" },
        { status: 404 },
      );
    }

    // Increment open count
    newsletter.openCount = (newsletter.openCount || 0) + 1;
    await newsletter.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error tracking newsletter view:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
