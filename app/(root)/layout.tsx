import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="root-container">
      <div className="pt-2 pb-2 text-black">
        <Header />
        <main className="mt-16">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
