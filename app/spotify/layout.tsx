import Footer from "@/components/blog/BlogFooter";
import { FloatingNavbar } from "@/components/common/navbar";
import React from "react";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <FloatingNavbar />
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
