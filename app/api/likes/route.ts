import redis from "@/lib/redis";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { generateIPHash } from "@/lib/utils";

const MAX_LIKES_PER_USER = 5;

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const headersList = headers();
    const ip = (await headersList).get("x-forwarded-for") ?? "unknown";
    const ipHash = await generateIPHash(ip);

    // Check if user has already reached max likes for this post
    const userLikesKey = `likes:${slug}:ip:${ipHash}:count`;
    const userLikes = await redis.get(userLikesKey);
    const currentUserLikes = userLikes ? Number.parseInt(userLikes, 10) : 0;

    if (currentUserLikes >= MAX_LIKES_PER_USER) {
      const likesKey = `likes:${slug}`;
      const currentLikes = await redis.get(likesKey);
      return NextResponse.json(
        {
          error: "Maximum likes reached",
          count: Number.parseInt(currentLikes || "0", 10),
          userLikes: currentUserLikes,
        },
        { status: 409 },
      );
    }

    const likesKey = `likes:${slug}`;

    // Use multi to ensure atomicity
    const multi = redis.multi();
    multi.incr(likesKey);
    // Increment user's like count for this post
    multi.incr(userLikesKey);

    const results = await multi.exec();

    if (!results) {
      throw new Error("Failed to execute Redis commands");
    }

    const count = results[0][1] as number;
    const newUserLikes = results[1][1] as number;

    return NextResponse.json({
      count,
      userLikes: newUserLikes,
    });
  } catch (error) {
    console.error("Error handling like:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const headersList = headers();
    const ip = (await headersList).get("x-forwarded-for") ?? "unknown";
    const ipHash = await generateIPHash(ip);

    const [likesCount, userLikes] = await Promise.all([
      redis.get(`likes:${slug}`),
      redis.get(`likes:${slug}:ip:${ipHash}:count`),
    ]);

    return NextResponse.json({
      count: Number.parseInt(likesCount || "0", 10),
      userLikes: Number.parseInt(userLikes || "0", 10),
    });
  } catch (error) {
    console.error("Error getting likes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
