import SearchOverlay from "@/components/SearchOverlay";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { ReactNode } from "react";
import CartSync from "@/components/Cart/CartSync";
import Help from "@/components/HelpChat/Help";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="root-container">
      <div className="pt-2 pb-2 text-black flex flex-col min-h-screen">
        <CartSync />
        <SearchOverlay />
        <Header />
        <main className="mt-10 md:mt-18 flex-1">{children}</main>
        <Help />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
