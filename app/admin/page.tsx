"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LeafSpinnerLoader from "@/components/common/LeafSpinnerLoader";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard on client-side
    router.replace("/admin/dashboard");
  }, [router]);

  // This will show briefly while the redirect happens
  return (
    <>
      <LeafSpinnerLoader />
    </>
  );
}
