// components\layout\DefaultLayout.tsx
import React from "react";
import BackToTop from "@/components/shared/back-to-top";
import Footer from "@/components/common/footer";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <main className="bg-white dark:bg-white">{children}</main>
      <BackToTop />
      <Footer />
    </>
  );
};

export default DefaultLayout;
