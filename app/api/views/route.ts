// app\api\views\route.ts
import { rateLimit } from "@/lib/rateLimiter";
import redis from "@/lib/redis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const viewsKey = `pageviews:${slug}`;

    // Get current count before rate limit check
    const currentCount = await redis.get(viewsKey);
    const count = Number.parseInt(currentCount || "0", 10);

    // Rate limit: 1 view per 5 minutes per IP
    const rateLimitResult = await rateLimit(`views:${slug}`, 1, 300);

    if (!rateLimitResult.success) {
      return NextResponse.json({
        count,
        rateLimited: true,
        reset: rateLimitResult.reset,
      });
    }

    // Increment count only if not rate limited
    const newCount = await redis.incr(viewsKey);

    return NextResponse.json({ count: newCount });
  } catch (error) {
    console.error("Error handling view:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
