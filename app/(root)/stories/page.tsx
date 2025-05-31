import { Metadata } from "next";
import { Messages } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const generateMetadata = async (): Promise<Metadata> => {
  const t: Messages = await getMessages();

  const title = t.TabTitles.Stories;

  return {
    title: title,
    description:
      "Perfect design solutions for everyone. Transform your space today!",
    openGraph: {
      url: "/stories",
      title: "Stories",
      description: "Stories...",
    },
  };
};

const Page: React.FC = async () => {
  const t = await getTranslations("StoriesPage");
  return (
    <div className="container p-10 flex flex-col gap-10">
      <div className="pt-10">
        <h1 className="text-5xl pb-3 font-bold">{t("title")}</h1>
        <p className="text-sm">{t("title")}</p>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <Link
          href="/stories/japandi-interior-design-style"
          className="min-h-full bg-gray pl-10 pt-15 lg:pl-0 lg:pt-0 flex flex-col rounded-md border border-transparent hover:border-black cursor-pointer"
        >
          <div className="flex flex-col gap-2 lg:pt-20 lg:pl-10 pr-10 lg:pr-0">
            <h1 className="lg:text-2xl text-xl font-bold">
              {t("japandiCard.title")}
            </h1>
            <p className="text-sm lg:text-base">{t("japandiCard.subTitle")}</p>
          </div>
          <Image
            className="lg:pt-16 pt-6 h-full lg:pl-10"
            src="/main/chairs-rug_4.jpeg"
            height={500}
            width={500}
            alt="chairs"
          />
        </Link>
        <Link
          href="/stories/dark-colors"
          className="min-h-full bg-gray flex flex-col  rounded-md border border-transparent hover:border-black cursor-pointer"
        >
          <div className="flex flex-col gap-2 pb-6 md:pb-28 pt-15 px-8 lg:pt-20 lg:pl-10">
            <h1 className="text-2xl font-bold">{t("darkCard.title")}</h1>
            <p className="text-sm lg:text-base">{t("darkCard.subTitle")}</p>
          </div>
          <Image
            className="h-full w-full"
            src="/main/darkColors.jpeg"
            height={500}
            width={500}
            alt="plant"
          />
        </Link>
        <Link
          href="/stories/plant-starter-pack"
          className=" min-h-full bg-gray flex flex-col  rounded-md border border-transparent hover:border-black cursor-pointer"
        >
          <div className="flex flex-col gap-2 pb-6 pt-15 px-8 lg:pt-20 lg:pl-10">
            <h1 className="text-2xl font-bold">{t("plantCard.title")}</h1>
            <p className="text-sm lg:text-base">{t("plantCard.subTitle")}</p>
          </div>
          <Image
            className="h-full w-full"
            src="/main/plant-starter-pack_4.jpeg"
            height={500}
            width={500}
            alt="plant"
          />
        </Link>
      </section>
    </div>
  );
};

export default Page;
