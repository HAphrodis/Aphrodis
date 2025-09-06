import { redirect } from "next/navigation";
import { auth } from "@/utils/auth";
import OverViewPage from "./overview/_components/overview";

export const metadata = {
  title: "Overview | Ishimwe Jean Baptiste Admin Panel",
};

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return <OverViewPage />;
}
