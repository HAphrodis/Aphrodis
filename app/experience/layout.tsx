import DefaultLayout from "@/components/layout/DefaultLayout";
import React from "react";
import ServicesPage from "./page";
import { PageHeader } from "@/components/common/page-header";
import { createMetadata } from "../metadata-utils";
import { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Services",
  description:
    "Discover the range of services offered by Ishimwe Jean Baptiste, a Full Stack Developer specializing in modern web technologies.",
  path: "/services",
})

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Experiences", isActive: true },
]

function ServicesLayout() {
  return (
    <DefaultLayout>
      <PageHeader title="My Experiences" breadcrumbs={breadcrumbs} />
      <ServicesPage />
    </DefaultLayout>
  );
}

export default ServicesLayout;
