// lib/redis.ts
import Redis from "ioredis";
import * as dotenv from "dotenv";

dotenv.config({ path: [".env.local"] });

if (!process.env.REDIS_URL) {
  throw new Error("❌ REDIS_URL is not defined in the environment variables");
}

const redisClient = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,  // 🔑 prevents retry crash
  enableReadyCheck: false,     // 🔑 avoids stuck "ready check"
  tls: {},                     // 🔑 required for `rediss://`
});

redisClient.on("error", (err) => {
  console.error("🔴 Redis Client Error:", err);
});

redisClient.on("connect", () => {
  console.log("🚀 Redis Client Connected");
});

redisClient.on("ready", () => {
  console.log("✅ Redis Client Ready");
});

// Utility function to test Redis
export async function testRedisOperations() {
  try {
    await redisClient.set("test_key", "test_value");
    const value = await redisClient.get("test_key");
    console.log("Redis test operation result:", value);
    await redisClient.del("test_key");
  } catch (error) {
    console.error("Redis test operation failed:", error);
  }
}

export default redisClient;
