// app\api\subscribers\unsubscribe\route.ts
import { type NextRequest, NextResponse } from "next/server";
import httpStatus from "http-status";
import { unsubscribeByEmail } from "@/services/subscriber-service";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate input
    const schema = z.object({
      email: z.string().email("Invalid email address"),
    });

    const result = schema.safeParse(data);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: result.error.issues },
        { status: httpStatus.BAD_REQUEST },
      );
    }

    const { email } = result.data;

    // Unsubscribe by email
    const subscriber = await unsubscribeByEmail(email);

    if (!subscriber) {
      return NextResponse.json(
        { error: "Email not found in subscriber list" },
        { status: httpStatus.NOT_FOUND },
      );
    }

    return NextResponse.json(
      { success: true, message: "Unsubscribed successfully" },
      { status: httpStatus.OK },
    );
  } catch (error) {
    console.error("Error unsubscribing:", error);
    return NextResponse.json(
      { error: "Failed to unsubscribe" },
      { status: httpStatus.INTERNAL_SERVER_ERROR },
    );
  }
}
