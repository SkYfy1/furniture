import { auth } from "@/auth";
import LogOut from "@/components/LogOut";
import { getTranslations } from "next-intl/server";
import React from "react";

const Layout: React.FC<{
  orders: React.ReactNode;
  authorization: React.ReactNode;
}> = async ({ orders, authorization }) => {
  const session = await auth();
  const t = await getTranslations("OrdersPage");

  return (
    <div className="container pt-12 min-h-screen px-4 lg:px-0">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        {session?.user && <LogOut text={t("Auth.logOut")} />}
      </div>
      {session?.user ? orders : authorization}
    </div>
  );
};

export default Layout;
