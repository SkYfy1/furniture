import TipSection from "@/components/TipSection";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="mt-20 lg:mt-36 max-w-[95rem] mx-auto px-6 pr-96">
      <span className=" text-sm mb-3 block">February 21, 2025</span>
      <div className="max-w-[1000]">
        <h1 className="text-5xl font-semibold mb-2">
          Japandi Interior Design Stylee
        </h1>
        <p className="mb-15 w-3/4 leading-7">
          Japandi interior design is a hybrid of east and west. The style is
          increasingly popular, and it is here to stay. The style creates
          interiors that are minimal without being cold. Japandi makes use of
          craftsmanship and tactile materials, such as textured wood and
          handmade ceramics, to add comfort and warmth.
        </p>
      </div>
      <div className="w-full h-[238] lg:h-[650] relative">
        <Image
          src="/main/sofa.jpeg"
          fill
          className="object-cover rounded-md"
          alt="category-image"
        />
      </div>
      <TipSection
        className="w-3/4"
        title="What Is Japandi Design?"
        paragraph="Japandi is a hybrid of Japanese and Scandinavian interior styles. Though it’s still very popular today, it actually dates back to the 1800s, when Japan opened its borders and visitors from Scandinavia arrived. The two cultures’ styles and mentalities were already similar, so there was a lot to like and be inspired by. Both value simplicity, good quality natural material, nature, and craftsmanship. Japandi brings out the best of both worlds."
      />
    </div>
  );
};

export default Page;
