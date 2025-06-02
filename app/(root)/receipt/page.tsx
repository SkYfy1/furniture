import { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";
import React from "react";

export const genearteMetadata = async (): Promise<Metadata> => {
  const t = await getMessages();

  const title = t.TabTitles.Receipt;

  return {
    title,
    description: "Thanks you for the order!",
    robots: {
      index: false,
      follow: false,
    },
  };
};

const Page = async () => {
  const t = await getTranslations("ReceiptPage");
  return (
    <div className="container text-center mt-12">
      <h1 className="text-5xl font-semibold block h-full">{t("title")}</h1>
    </div>
  );
};

export default Page;
