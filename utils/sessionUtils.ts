/* eslint-disable @typescript-eslint/no-unused-vars */
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import Session from "@/models/Session";
// import logger from "@/utils/logger"

const secretKey = process.env.AUTH_SECRET;
if (!secretKey) {
  throw new Error("AUTH_SECRET environment variable is not set");
}

const key = new TextEncoder().encode(secretKey);

export const encrypt = async (payload: {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  role: string;
  expiresAt: Date;
}) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(payload.expiresAt)
    .sign(key);
};

export async function decrypt(session: string | undefined = "") {
  try {
    if (!session) return null;

    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    // logger.error("Session decryption error:", error)
    return null;
  }
}

export const createSession = async (
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
  avatarUrl: string,
  role: string,
  duration: string,
) => {
  const expiresIn = duration === "28h" ? 28 * 60 * 60 : 24 * 60 * 60; // in seconds
  const expiresAt = new Date(Date.now() + expiresIn * 1000);
  const sessionToken = await encrypt({
    userId,
    firstName,
    lastName,
    email,
    avatarUrl,
    role,
    expiresAt,
  });

  return {
    sessionToken,
    cookieOptions: {
      name: "session",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: expiresIn,
      sameSite: "lax" as const,
    },
  };
};

export const getSessionToken = async () => {
  return (await cookies()).get("session")?.value;
};

export const verifySession = async (token: string) => {
  try {
    const payload = await decrypt(token);
    if (!payload) return null;

    // Check if session exists in Redis
    const session = await Session.findByToken(token);
    if (!session) {
      // logger.warn("Session not found in Redis:", token.substring(0, 10) + "...")
      return null;
    }

    // Check if session is expired
    if (new Date(session.expires) < new Date()) {
      // logger.info("Session expired:", token.substring(0, 10) + "...")
      await Session.deleteByToken(token);
      return null;
    }

    return payload;
  } catch (error) {
    // logger.error("Session verification error:", error)
    return null;
  }
};

export const deleteSession = async (token?: string): Promise<boolean> => {
  try {
    const cookieStore = cookies();

    // Delete session cookie
    (
      await // Delete session cookie
      cookieStore
    ).set("session", "", {
      maxAge: 0,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // Delete session from Redis if token is provided
    if (token) {
      await Session.deleteByToken(token);
    } else {
      // Try to get token from cookies if not provided
      const sessionToken = (await cookieStore).get("session")?.value;
      if (sessionToken) {
        await Session.deleteByToken(sessionToken);
      }
    }

    return true;
  } catch (error) {
    // logger.error("Error deleting session:", error)
    return false;
  }
};
