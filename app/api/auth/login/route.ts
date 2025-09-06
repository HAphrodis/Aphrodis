import type { NextRequest } from "next/server";
import { z } from "zod";
import StaffMember, { TwoFactorToken } from "@/models/Staff";
import { comparePassword, isPasswordExpired } from "@/utils/passwordUtils";
import { createSession } from "@/utils/sessionUtils";
import { rateLimit } from "@/utils/rateLimiter";
import httpStatus from "http-status";
import logger from "@/utils/logger";
import {
  generateTwoFactorToken,
  sendTwoFactorTokenEmail,
} from "@/utils/twoFactorUtils";
import { sendLoginNotificationEmail } from "@/utils/notificationUtils";
import { headers } from "next/headers";
import Session from "@/models/Session";
import AuditLog from "@/models/AuditLog";
import { errorResponse, successResponse } from "@/lib/api-response";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  code: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const startTime = performance.now();

  try {
    // Apply rate limiting
    const rateLimitResult = await rateLimit("signin", 40, 60 * 5);
    if (!rateLimitResult.success) {
      return errorResponse(
        request,
        {
          code: "RATE_LIMITED",
          message: "Too many login attempts. Please try again later.",
        },
        { statusCode: 429, startTime },
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = signInSchema.safeParse(body);

    if (!validatedData.success) {
      logger.warn(
        `Invalid signin attempt: ${JSON.stringify(validatedData.error.flatten().fieldErrors)}`,
      );
      return errorResponse(
        request,
        {
          code: "VALIDATION_ERROR",
          message: "Invalid credentials",
          details: validatedData.error.flatten().fieldErrors,
        },
        { statusCode: httpStatus.BAD_REQUEST, startTime },
      );
    }

    const { email, password, code } = validatedData.data;

    // Get location info from headers
    const headersList = await headers();
    const locationInfo = {
      ip: request.headers.get("x-forwarded-for") || "Unknown",
      city: headersList.get("x-vercel-ip-city") || undefined,
      country: headersList.get("x-vercel-ip-country") || undefined,
      userAgent: headersList.get("user-agent") || "Unknown",
    };

    // Find staff by email
    const staff = await StaffMember.findByEmail(email);
    if (!staff) {
      logger.warn(`Signin attempt with non-existent email: ${email}`);

      await AuditLog.create({
        action: "LOGIN_ATTEMPT",
        user: "Unknown",
        details: `Login attempt with non-existent email: ${email}`,
      });

      return errorResponse(
        request,
        {
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
        },
        { statusCode: httpStatus.UNAUTHORIZED, startTime },
      );
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, staff.password);
    if (!isPasswordValid) {
      logger.warn(`Invalid password attempt for email: ${email}`);

      await AuditLog.create({
        action: "LOGIN_ATTEMPT",
        user: "Unknown",
        details: `Invalid password attempt for email: ${email}`,
      });

      return errorResponse(
        request,
        {
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
        },
        { statusCode: httpStatus.UNAUTHORIZED, startTime },
      );
    }

    // Check if password is expired
    if (isPasswordExpired(new Date(staff.passwordLastChanged))) {
      logger.info(`Password expired for user: ${email}`);

      await AuditLog.create({
        action: "LOGIN_ATTEMPT",
        user: email,
        details: "Password expired",
      });

      return errorResponse(
        request,
        {
          code: "PASSWORD_EXPIRED",
          message: "Password expired. Please reset your password.",
        },
        { statusCode: httpStatus.UNAUTHORIZED, startTime },
      );
    }

    // Handle two-factor authentication
    if (staff.isTwoFactorEnabled === "true" && !code) {
      const twoFactorToken = await generateTwoFactorToken(staff.email);
      await sendTwoFactorTokenEmail(
        staff.email,
        twoFactorToken.token,
        staff.firstName,
        locationInfo,
      );

      await AuditLog.create({
        action: "TWO_FACTOR_REQUIRED",
        user: email,
        details: "Two-factor authentication required",
      });

      return successResponse(
        request,
        { twoFactorRequired: true },
        {
          message: "Two-factor authentication required",
          statusCode: httpStatus.OK,
          startTime,
        },
      );
    }

    if (staff.isTwoFactorEnabled === "true" && code) {
      const twoFactorToken = await TwoFactorToken.findByEmailAndToken(
        staff.email,
        code,
      );

      if (!twoFactorToken || new Date(twoFactorToken.expires) < new Date()) {
        await AuditLog.create({
          action: "TWO_FACTOR_FAILED",
          user: email,
          details: "Invalid two-factor code",
        });

        return errorResponse(
          request,
          {
            code: "INVALID_2FA",
            message: "Invalid two-factor code",
          },
          { statusCode: httpStatus.UNAUTHORIZED, startTime },
        );
      }

      await TwoFactorToken.deleteById(twoFactorToken.id);
    }

    // Create session
    const { sessionToken, cookieOptions } = await createSession(
      staff.id,
      staff.firstName,
      staff.lastName,
      staff.avatarUrl || "",
      staff.role,
      "24h",
      locationInfo.ip, // Added missing argument
    );

    // Store session in Redis
    const session = await Session.create({
      userId: staff.id,
      token: sessionToken,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      userAgent: locationInfo.userAgent,
    });

    logger.info(`User signed in successfully: ${email}`);

    await AuditLog.create({
      action: "LOGIN_SUCCESS",
      user: email,
      details: `User signed in successfully. Session ID: ${session.id}`,
    });

    // Send login notification email to admin
    await sendLoginNotificationEmail(
      {
        name: `${staff.firstName} ${staff.lastName}`,
        email: staff.email,
      },
      locationInfo,
      session.id,
    );

    // Return success response with cookie
    const response = successResponse(
      request,
      {
        user: {
          id: staff.id,
          firstName: staff.firstName,
          lastName: staff.lastName,
          email: staff.email,
          role: staff.role,
          avatarUrl: staff.avatarUrl,
        },
        token: sessionToken,
      },
      {
        message: "Signed in successfully",
        statusCode: httpStatus.OK,
        startTime,
      },
    );

    // Set cookie
    response.cookies.set(cookieOptions);

    return response;
  } catch (error) {
    logger.error(`Sign-in error: ${error}`);

    await AuditLog.create({
      action: "LOGIN_ERROR",
      user: "Unknown",
      details: `Sign-in error: ${error}`,
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
