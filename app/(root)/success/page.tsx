import React from "react";
import ClearCart from "./components/ClearCart";
import { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";
import { Messages } from "next-intl";

interface Props {
  searchParams?: Promise<{ payment_id: string }>;
}

export const generateMetadata = async (): Promise<Metadata> => {
  const t: Messages = await getMessages();

  const title = t.TabTitles.Success;

  return {
    title: title,
    description: "Order completed successfully!",
    robots: {
      index: false,
      follow: false,
    },
  };
};

const Page: React.FC<Props> = async ({ searchParams }) => {
  const paymentId = (await searchParams)?.payment_id;
  const t = await getTranslations("SuccessPage");

  return (
    <div className="container text-center mt-8 lg:mt-16">
      <h1 className="text-2xl lg:text-5xl font-semibold block h-full">
        {t("title")}
      </h1>
      <p className="mt-2 lg:mt-6">
        {t("id")} <span className="text-xs font-semibold">{paymentId}</span>
      </p>
      <p className="mt-2 text-sm lg:text-xl">{t("info")}</p>
      <ClearCart />
    </div>
  );
};

export default Page;
