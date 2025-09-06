// utils\clientSessionUtils.ts
"use server";
import { cookies } from "next/headers";
import { decrypt } from "./sessionUtils";

export interface SessionData {
  userId: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  role: string;
}

export const getSessionDataFromCookies =
  async (): Promise<SessionData | null> => {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if (session) {
      const sessionData: SessionData = {
        userId: session.userId as string,
        firstName: session.firstName as string,
        lastName: session.lastName as string,
        avatarUrl: session.avatarUrl as string,
        role: session.role as string,
      };
      return sessionData;
    }
    return null;
  };
