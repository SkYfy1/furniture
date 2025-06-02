import Cart from "@/components/Cart/Cart";
import { Metadata } from "next";
import { Messages } from "next-intl";
import { getMessages } from "next-intl/server";
import React from "react";

export const generateMetadata = async (): Promise<Metadata> => {
  const t: Messages = await getMessages();

  const title = t.TabTitles.Cart;

  return {
    title: title,
  };
};

const Page = () => {
  return (
    <div className="container px-12 xl:px-72 pt-14 min-h-[60vh] flex-col flex items-center justify-center">
      <Cart />
    </div>
  );
};

export default Page;
