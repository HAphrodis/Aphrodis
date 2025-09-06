// app\api\spotify\now-playing\route.ts
import { NextResponse } from "next/server";
import { getCurrentSong } from "@/lib/song";

export async function GET() {
  try {
    // console.log("Fetching current song from Redis or Spotify")
    const track = await getCurrentSong();

    // console.log("Current song data:", JSON.stringify(track, null, 2))

    if (!track) {
      // console.log("No track data available")
      return NextResponse.json({ isPlaying: false });
    }

    return NextResponse.json(track);
  } catch (error) {
    console.error("Error fetching now playing:", error);
    return NextResponse.json({
      isPlaying: false,
      error: "Failed to fetch current song",
    });
  }
}
