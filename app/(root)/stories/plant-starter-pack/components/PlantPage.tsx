"use client";

import StoriesOffer from "@/components/StoriesOffer";
import TipSection from "@/components/TipSection";
import Image from "next/image";
import React, { useState } from "react";
import QuoteBlock from "./QuoteBlock";
import ImageGallery from "./ImageGallery";
import ProductMarker from "./ProductMarker";
import { useTranslations } from "next-intl";

const PlantPage: React.FC<{ products: Product[] }> = ({ products }) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const selectProduct = (id: string) => {
    setSelectedId(id);
  };
  const t = useTranslations("StoriesPage.PlantPage");
  return (
    <div className="stories-container">
      <div className="lg:w-7/12">
        <div className="w-full h-[400] md:h-[600] lg:h-[700] xl:h-[800] relative">
          <ProductMarker
            product={products[0]}
            className={
              "top-45 right-35 xl:top-58 xl:right-50 2xl:top-58 2xl:right-55"
            }
            selectProduct={selectProduct}
          />
          <ProductMarker
            product={products[1]}
            className={
              "bottom-10 left-14 xl:bottom-30 xl:left-25 2xl:bottom-25 2xl:left-32"
            }
            selectProduct={selectProduct}
          />
          <ProductMarker
            product={products[2]}
            className={
              "bottom-45 left-45 xl:bottom-70 xl:left-55 2xl:bottom-65 2xl:left-62"
            }
            selectProduct={selectProduct}
          />
          <Image
            src="/main/plant-starter-pack_4.jpeg"
            fill
            className="object-contain"
            alt="category-image"
          />
        </div>
        <TipSection
          title={t("tips.first.title")}
          paragraph={t("tips.first.tipText")}
        />
        <QuoteBlock quote={t("quote")} />
        <ImageGallery
          rows={4}
          images={[
            "earth.webp",
            "laptop.webp",
            "corner.webp",
            "plant-starter-pack_4.jpeg",
          ]}
        />
        <TipSection
          className="mt-10 mb-20"
          title={t("tips.second.title")}
          paragraph={t("tips.second.tipText")}
        />
        <div className="w-full h-[260] lg:h-[650] relative col-span-2">
          <Image
            src="/main/corner.webp"
            fill
            className="object-cover rounded-md"
            alt="category-image"
          />
        </div>
        <TipSection
          className="mb-20"
          title={t("tips.third.title")}
          paragraph={t("tips.third.tipText")}
        />
        <ImageGallery
          images={["fill.webp", "plants.webp", "housedecor.webp"]}
        />
        <TipSection
          className="mb-20"
          title={t("tips.fourth.title")}
          paragraph={t("tips.fourth.tipText")}
        />
        <div className="flex gap-2 flex-col">
          <div className="w-full h-[238] lg:h-[650] relative col-span-2">
            <Image
              src="/main/big-sale-banner_3.jpeg"
              fill
              className="object-cover rounded-md"
              alt="category-image"
            />
          </div>
          <div className="w-full h-[238] lg:h-[650] relative">
            <Image
              src="/main/corner.webp"
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
        selected={selectedId}
      />
    </div>
  );
};

export default PlantPage;
