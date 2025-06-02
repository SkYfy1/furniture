import TipSection from "@/components/TipSection";
import Image from "next/image";
import React from "react";
import ImageGallery from "../plant-starter-pack/components/ImageGallery";
import Product from "@/components/Product";
import { getFewProducts } from "@/lib/data/products";
import { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";
import { Messages } from "next-intl";

export const generateMetadata = async (): Promise<Metadata> => {
  const t: Messages = await getMessages();

  const title = t.TabTitles.Japandi;

  return {
    title: title,
    description:
      "Japandi interior design is a hybrid of east and west. The style is increasingly popular, and it is here to stay. The style creates interiors that are minimal without being cold.",
    openGraph: {
      url: "stories/japandi-interior-design",
      title: "Japandi interior design",
      description: "Japandi interior design is a hybrid of east and...",
    },
  };
};

const Page = async () => {
  const products = await getFewProducts();
  const t = await getTranslations("StoriesPage.JapandiPage");

  return (
    <>
      <div className="mt-8 md:mt-20 lg:mt-24 max-w-[95rem] mx-auto px-6 lg:pr-96">
        <span className=" text-sm mb-3 block">{t("month")} 21, 2025</span>
        <div className="max-w-[1000]">
          <h1 className="text-5xl font-semibold mb-2">{t("title")}</h1>
          <p className="mb-15 lg:w-3/4 leading-7">{t("subTitle")}</p>
        </div>
        <div className="w-full h-[238] lg:h-[650] relative">
          <Image
            src="/main/chairs-rug.jpeg"
            fill
            className="object-cover rounded-md"
            alt="category-image"
          />
        </div>
        <TipSection
          className="lg:w-3/4 p-0 pb-8 lg:p-8"
          title={t("tips.what.title")}
          paragraph={t("tips.what.tipText")}
        />
        <ImageGallery
          images={["japandi-i.jpeg", "japandi-i.jpeg", "japandi-inter.jpeg"]}
        />
        <TipSection
          className="lg:w-3/4 p-0 pb-8 lg:p-8"
          title={t("tips.headline.title")}
          paragraph={t("tips.headline.tipText")}
        />
        <ImageGallery
          images={["chairs-rug.jpeg", "japandi-inter.jpeg", "japandi-i.jpeg"]}
        />
      </div>
      <div className="container mt-24 px-6">
        <h1 className="font-semibold">Featured products</h1>
        <div className="grid grid-cols-2 mt-5 lg:gap-12 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {products.map((product) => (
            <Product name={product.name} key={product.id} data={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
