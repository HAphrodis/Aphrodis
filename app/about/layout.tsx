import DefaultLayout from "@/components/layout/DefaultLayout";
import React from "react";
import AboutPage from "./page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Ishimwe Jean Baptiste",
  description:
    "Learn more about Ishimwe Jean Baptiste, a Full Stack Developer specializing in modern web technologies.",
};

function WorkLayout() {
  return (
    <DefaultLayout>
      <AboutPage />
    </DefaultLayout>
  );
}

export default WorkLayout;
