import { auth } from "@/auth";
import React from "react";

const Layout: React.FC<{
  orders: React.ReactNode;
  authorization: React.ReactNode;
}> = async ({ orders, authorization }) => {
  const session = await auth();

  return (
    <div className="container pt-12 min-h-screen">
      <h1 className="text-2xl font-semibold">Your orders</h1>
      {session?.user ? orders : authorization}
    </div>
  );
};

export default Layout;
