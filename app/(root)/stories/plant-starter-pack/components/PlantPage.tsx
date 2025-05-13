"use client";

import StoriesOffer from "@/components/StoriesOffer";
import TipSection from "@/components/TipSection";
import Image from "next/image";
import React, { useState } from "react";
import QuoteBlock from "./QuoteBlock";
import ImageGallery from "./ImageGallery";
import ProductMarker from "./ProductMarker";

const PlantPage: React.FC<{ products: Product[] }> = ({ products }) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const selectProduct = (id: string) => {
    setSelectedId(id);
  };
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
          title="Use Different-Sized Plants"
          paragraph="You don’t want a look that’s too uniform. Pair plants with different
            widths and heights together. They’ll look more natural and fresh."
        />
        <QuoteBlock />
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
          title="Arrange Plants In Odd-Numbered Groups"
          paragraph="The “law of threes” suggests that odd-numbered collections are more
            visually pleasing and effective than even-numbered collections.
            Arrange your plants in groups of 3, 5, 7, 9, and so on."
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
          title="Use Decorative Pots"
          paragraph="Combine pots with different materials and colors for an electric finish. Use pots with similar finishes for an elegant look."
        />
        <ImageGallery
          images={["fill.webp", "plants.webp", "housedecor.webp"]}
        />
        <TipSection
          className="mb-20"
          title="Houseplant Care"
          paragraph="Group plants with other plants that share the same needs in terms of sunlight, water, climate, and so on."
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
        title="Plant starter pack"
        description="Designing with plant starter pack can add depth and coziness to a small space. Read our tips for using darker colors in your decor."
        products={products}
        selected={selectedId}
      />
    </div>
  );
};

export default PlantPage;
