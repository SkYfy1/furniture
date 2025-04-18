import Header from "@/components/Header";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="root-container">
      <div className="mx-auto w-full pt-2 pb-2 text-black">
        <Header />
        <div className="mt-16">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
