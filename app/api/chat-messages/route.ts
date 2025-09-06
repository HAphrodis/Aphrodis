import { NextResponse } from "next/server";
import redisClient from "@/lib/redis";

export async function GET() {
  try {
    const messages = await redisClient.lrange("chat_messages", 0, -1);
    const parsedMessages = messages.map((msg) => JSON.parse(msg));
    return NextResponse.json(parsedMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const message = await req.json();
    await redisClient.rpush("chat_messages", JSON.stringify(message));
    return NextResponse.json({ message: "Message stored successfully" });
  } catch (error) {
    console.error("Error storing message:", error);
    return NextResponse.json(
      { error: "Failed to store message" },
      { status: 500 },
    );
  }
}
