import React from "react";
import { FloatingNavbar } from "@/components/common/navbar";
import Footer from "@/components/common/footer";
// import ScrollToTop from "@/components/common/scroll-to-top";

interface DefaultLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <FloatingNavbar />

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default DefaultLayout;
