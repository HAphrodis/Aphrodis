import { cookies } from "next/headers";
import { decrypt } from "./sessionUtils";

export async function getSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    return null;
  }

  try {
    const session = await decrypt(sessionToken);
    return session;
  } catch (error) {
    console.error("Error decrypting session:", error);
    return null;
  }
}

export async function auth() {
  const session = await getSession();
  return session ? { user: session } : null;
}
