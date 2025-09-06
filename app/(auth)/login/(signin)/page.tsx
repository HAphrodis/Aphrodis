// app\(auth)\login\(signin)\page.tsx
import type { Metadata } from "next";
import SignInViewPage from "../_components/sigin-view";
import { redirect } from "next/navigation";
import { decrypt } from "@/utils/sessionUtils";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Admin Access | Portfolio Dashboard",
  description: "Sign in to manage your portfolio content and analytics",
};

export default async function Page() {
  const cookie = (await cookies()).get("session")?.value;
  if (cookie) {
    const session = await decrypt(cookie);
    if (session && session.userId) {
      redirect("/admin/dashboard");
    }
  }

  return <SignInViewPage />;
}
