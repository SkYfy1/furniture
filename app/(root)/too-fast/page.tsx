import { Metadata } from "next";
import { Messages } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import React from "react";

export const generateMetadata = async (): Promise<Metadata> => {
  const t: Messages = await getMessages();

  const title = t.TabTitles.TooFast;

  return {
    title,
    description: "Something went wrong!",
    robots: {
      index: false,
      follow: false,
    },
  };
};

const Page = async () => {
  const t = await getTranslations("TooFastPage");
  return (
    <div className="container mt-12 text-center">
      <h1 className="text-5xl font-semibold block h-full">{t("title")}</h1>
    </div>
  );
};

export default Page;
