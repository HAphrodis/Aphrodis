"use server";
import { headers } from "next/headers";
import redis from "./redis";

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: Date;
}

export async function rateLimit(
  key: string,
  limit: number,
  duration: number, // in seconds
): Promise<RateLimitResult> {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") ?? "unknown";

  // Generate a SHA-256 hash for the IP address
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(ip),
  );
  const hash = Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const rateLimitKey = `ratelimit:${key}:${hash}`;

  const response = await redis
    .pipeline()
    .incr(rateLimitKey)
    .expire(rateLimitKey, duration)
    .exec();

  if (!response || response.length === 0 || response[0][0]) {
    throw new Error("Failed to execute rate limiting");
  }

  const currentUsage = response[0][1] as number;

  if (currentUsage > limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: new Date(Date.now() + duration * 1000),
    };
  }
  return {
    success: true,
    limit,
    remaining: Math.max(0, limit - currentUsage),
    reset: new Date(Date.now() + duration * 1000),
  };
}
