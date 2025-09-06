import DefaultLayout from "@/components/layout/DefaultLayout";
import React from "react";
import GuestbookPage from "./page";

function GuestbookLayout() {
  return (
    <DefaultLayout>
      <GuestbookPage />
    </DefaultLayout>
  );
}

export default GuestbookLayout;
