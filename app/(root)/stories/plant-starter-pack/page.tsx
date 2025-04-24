import StoriesOffer from "@/components/StoriesOffer";
import Image from "next/image";
import React from "react";
import QuoteBlock from "./components/QuoteBlock";
import ImageGallery from "./components/ImageGallery";
import TipSection from "@/components/TipSection";

const Page = () => {
  return (
    <div className="stories-container">
      <div>
        <div className="w-full h-[400] lg:h-[1000] relative">
          <Image
            src="/main/plant-starter-pack_4.jpeg"
            fill
            className="object-cover rounded-md"
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
      <StoriesOffer />
    </div>
  );
};

export default Page;
