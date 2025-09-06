import type { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

let io: ServerIO | undefined;

// We'll use a global variable to store the server instance
const httpServer: NetServer | null = null;

export async function GET() {
  if (io) {
    console.log("Socket is already running");
    return NextResponse.json(
      { message: "Socket is already running" },
      { status: 200 },
    );
  }

  // Check if we have already stored the server instance
  if (!httpServer) {
    // If not, we need to find a way to get the server instance
    // This is a workaround and might not be reliable in all environments
    console.error("Failed to get server instance");
    return NextResponse.json(
      { message: "Failed to initialize socket" },
      { status: 500 },
    );
  }

  io = new ServerIO(httpServer, {
    path: "/api/socket",
    addTrailingSlash: false,
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on(
      "chat message",
      (msg: { text: string; isUser: boolean; avatar: string }) => {
        console.log(`Message received: ${msg.text}`);
        // Broadcast the message to all connected clients
        if (io) {
          io.emit("chat message", msg);
          console.log(`Message broadcasted: ${msg.text}`);
        }
      },
    );

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  console.log("Socket is initialized");
  return NextResponse.json(
    { message: "Socket is initialized" },
    { status: 200 },
  );
}
