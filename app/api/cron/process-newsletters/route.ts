import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { processScheduledNewsletters } from "@/utils/newsletterUtils";

export async function GET(request: NextRequest) {
  try {
    // Verify the request is from a cron job
    const authHeader = request.headers.get("Authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await processScheduledNewsletters();

    return NextResponse.json({
      success: true,
      message: `Processed ${result.processed} scheduled newsletters`,
      data: result,
    });
  } catch (error) {
    console.error("Error processing scheduled newsletters:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process scheduled newsletters",
        error: String(error),
      },
      { status: 500 },
    );
  }
}
