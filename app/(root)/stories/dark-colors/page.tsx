import StoriesOffer from "@/components/StoriesOffer";
import TipSection from "@/components/TipSection";
import Image from "next/image";
import React from "react";

const Page: React.FC = async () => {
  return (
    <div className="stories-container relative">
      <div className="rounded-md">
        <div className="w-full h-[295] lg:h-[600] relative">
          <Image
            src="/main/darkColors.jpeg"
            fill
            className="object-cover rounded-md"
            alt="category-image"
          />
        </div>
        <TipSection
          title="Pair With Warm Neutrals"
          paragraph="If you paint your room with a dramatic dark color, pair this with
          neutral furnishings for a comfortable, inviting look."
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
      <StoriesOffer />
    </div>
  );
};

export default Page;
