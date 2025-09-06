import { NextResponse } from "next/server";
import { isPortfolioOwner } from "@/lib/auth";
import { forceRefreshCurrentSong } from "@/lib/song";

export async function POST() {
  try {
    // Only allow the portfolio owner to force refresh
    const isOwner = await isPortfolioOwner();

    if (!isOwner) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const track = await forceRefreshCurrentSong();

    if (!track) {
      return NextResponse.json(
        { error: "Failed to refresh song data" },
        { status: 500 },
      );
    }

    return NextResponse.json(track);
  } catch (error) {
    console.error("Error refreshing song data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
