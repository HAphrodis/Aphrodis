import { NextRequest } from "next/server";
import {
  deleteSession,
  getSessionToken,
  verifySession,
} from "@/utils/sessionUtils";
import { rateLimit } from "@/utils/rateLimiter";
import httpStatus from "http-status";
import logger from "@/utils/logger";
import AuditLog from "@/models/AuditLog";
import Session from "@/models/Session";
import { errorResponse, successResponse } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  const startTime = performance.now();

  try {
    // Apply rate limiting
    const rateLimitResult = await rateLimit("logout", 10, 60);
    if (!rateLimitResult.success) {
      return errorResponse(
        request,
        {
          code: "RATE_LIMITED",
          message: "Too many logout attempts. Please try again later.",
        },
        { statusCode: 429, startTime },
      );
    }

    // Get session token from cookies
    const sessionToken = await getSessionToken();
    if (!sessionToken) {
      logger.warn("Logout attempt with no session token");

      await AuditLog.create({
        action: "LOGOUT_ATTEMPT",
        user: "Unknown",
        details: "Logout attempt with no session token",
      });

      return errorResponse(
        request,
        {
          code: "UNAUTHORIZED",
          message: "No active session",
        },
        { statusCode: httpStatus.UNAUTHORIZED, startTime },
      );
    }

    // Verify session
    const session = await verifySession(sessionToken);
    if (!session) {
      logger.warn("Logout attempt with invalid session token");

      await AuditLog.create({
        action: "LOGOUT_ATTEMPT",
        user: "Unknown",
        details: "Logout attempt with invalid session token",
      });

      return errorResponse(
        request,
        {
          code: "UNAUTHORIZED",
          message: "Invalid session",
        },
        { statusCode: httpStatus.UNAUTHORIZED, startTime },
      );
    }

    // Get user information for audit log
    const userId = session.userId;
    const userEmail: string =
      typeof session.email === "string" ? session.email : "Unknown";

    // Delete session from Redis using the Session model
    const deleted = await Session.deleteByToken(sessionToken);

    if (!deleted) {
      logger.warn(`Failed to delete session for user: ${userEmail}`);

      await AuditLog.create({
        action: "LOGOUT_ERROR",
        user: userEmail,
        details: "Failed to delete session from Redis",
      });

      return errorResponse(
        request,
        {
          code: "INTERNAL_ERROR",
          message: "Failed to delete session",
        },
        { statusCode: httpStatus.INTERNAL_SERVER_ERROR, startTime },
      );
    }

    // Delete session cookie
    await deleteSession();

    logger.info(`User logged out successfully: ${userEmail}`);

    // Create audit log for successful logout
    await AuditLog.create({
      action: "LOGOUT_SUCCESS",
      user: userEmail,
      details: `User logged out successfully. User ID: ${userId}`,
    });

    return successResponse(
      request,
      { success: true },
      {
        message: "Logged out successfully",
        statusCode: httpStatus.OK,
        startTime,
      },
    );
  } catch (error) {
    logger.error(`Logout error: ${error}`);

    // Create audit log for logout error
    await AuditLog.create({
      action: "LOGOUT_ERROR",
      user: "Unknown",
      details: `Logout error: ${error}`,
    });

    return errorResponse(
      request,
      {
        code: "INTERNAL_ERROR",
        message: "An unexpected error occurred",
      },
      { statusCode: httpStatus.INTERNAL_SERVER_ERROR, startTime },
    );
  }
}
