import Footer from "@/components/common/footer";
import { FloatingNavbar } from "@/components/common/navbar";
import React from "react";

interface DefaultLayoutProps {
  children: React.ReactNode;
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
