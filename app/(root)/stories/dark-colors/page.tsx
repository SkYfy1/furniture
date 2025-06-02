import StoriesOffer from "@/components/StoriesOffer";
import TipSection from "@/components/TipSection";
import { getLimitedProducts } from "@/lib/data/products";
import { Metadata } from "next";
import { Messages } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

export const generateMetadata = async (): Promise<Metadata> => {
  const t: Messages = await getMessages();

  const title = t.TabTitles.Dark;

  return {
    title: title,
    description:
      "Designing with dark colors can add depth and coziness to a small space. Read our tips for using darker colors in your decor.",
    openGraph: {
      url: "/stories/dark-colors",
      title: "Dark Colors",
      description: "Designing with dark colors...",
    },
  };
};

const Page: React.FC = async () => {
  const products = await getLimitedProducts("Sofas", 3);
  const t = await getTranslations("StoriesPage.DarkPage");
  return (
    <div className="stories-container relative">
      <div className="lg:w-7/12">
        <div className="w-full h-[295] md:h-[430] xl:h-[550] 2xl:h-[700] relative">
          <Image
            src="/main/darkColors.jpeg"
            fill
            className="object-cover rounded-md"
            alt="category-image"
          />
        </div>
        <TipSection
          title={t("tips.pair.title")}
          paragraph={t("tips.pair.tipText")}
        />
        <div className="flex flex-col gap-2 pt-24">
          <div className="w-full h-[238] lg:h-[300] relative">
            <Image
              src="/main/alocasia.jpeg"
              fill
              className="object-cover rounded-md"
              alt="category-image"
            />
          </div>
          <div className="w-full h-[238] lg:h-[300] relative">
            <Image
              src="/main/sofa.jpeg"
              fill
              className="object-cover rounded-md"
              alt="category-image"
            />
          </div>
        </div>
      </div>
      <StoriesOffer
        title={t("title")}
        description={t("subTitle")}
        products={products}
      />
    </div>
  );
};

export default Page;
