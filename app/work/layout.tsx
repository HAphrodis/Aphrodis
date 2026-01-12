import DefaultLayout from "@/components/layout/DefaultLayout";
import React from "react";
import ProjectsPage from "./page";
import PageHeader from "@/components/shared/page-header";

function WorkLayout() {
  return (
    <DefaultLayout>
        <PageHeader
        title="Featured"
        highlightedTitle="Projects"
        subtitle="A showcase of latest projects, highlighting web apps, design systems, and digital experiences that reflect my enthusiasm for crafting innovative solutions."
      />
      <ProjectsPage />
    </DefaultLayout>
  );
}

export default WorkLayout;
