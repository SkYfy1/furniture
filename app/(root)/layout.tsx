import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="root-container">
      <div className="pt-2 pb-2 text-black">
        <Header />
        <div className="mt-16 grid-cols-custom grid gap-5 gap-y-5 my-5">
          {children}
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
