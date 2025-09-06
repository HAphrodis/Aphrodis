// app\attributions\layout.tsx
import DefaultLayout from "@/components/layout/DefaultLayout";
import React from "react";
import AttributionPage from "./page";

function AttributionLayout() {
  return (
    <DefaultLayout>
      <AttributionPage />
    </DefaultLayout>
  );
}

export default AttributionLayout;
