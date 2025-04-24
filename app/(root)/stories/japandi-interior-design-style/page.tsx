import TipSection from "@/components/TipSection";
import Image from "next/image";
import React from "react";
import ImageGallery from "../plant-starter-pack/components/ImageGallery";
import Product from "@/components/Product";

const Page = () => {
  return (
    <>
      <div className="mt-20 lg:mt-36 max-w-[95rem] mx-auto px-6 lg:pr-96">
        <span className=" text-sm mb-3 block">February 21, 2025</span>
        <div className="max-w-[1000]">
          <h1 className="text-5xl font-semibold mb-2">
            Japandi Interior Design Stylee
          </h1>
          <p className="mb-15 lg:w-3/4 leading-7">
            Japandi interior design is a hybrid of east and west. The style is
            increasingly popular, and it is here to stay. The style creates
            interiors that are minimal without being cold. Japandi makes use of
            craftsmanship and tactile materials, such as textured wood and
            handmade ceramics, to add comfort and warmth.
          </p>
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
          title="What Is Japandi Design?"
          paragraph="Japandi is a hybrid of Japanese and Scandinavian interior styles. Though it’s still very popular today, it actually dates back to the 1800s, when Japan opened its borders and visitors from Scandinavia arrived. The two cultures’ styles and mentalities were already similar, so there was a lot to like and be inspired by. Both value simplicity, good quality natural material, nature, and craftsmanship. Japandi brings out the best of both worlds."
        />
        <ImageGallery images={["japandi-i", "japandi-i", "japandi-inter"]} />
        <TipSection
          className="lg:w-3/4 p-0 pb-8 lg:p-8"
          title="Headline"
          paragraph="Japandi is a hybrid of Japanese and Scandinavian interior styles. Though it’s still very popular today, it actually dates back to the 1800s, when Japan opened its borders and visitors from Scandinavia arrived. The two cultures’ styles and mentalities were already similar, so there was a lot to like and be inspired by. Both value simplicity, good quality natural material, nature, and craftsmanship. Japandi brings out the best of both worlds."
        />
        <ImageGallery images={["chairs-rug", "japandi-inter", "japandi-i"]} />
      </div>
      <div className="container mt-24 px-6">
        <h1 className="font-semibold">Featured products</h1>
        <div className="grid grid-cols-2 mt-5 lg:gap-12 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </div>
    </>
  );
};

export default Page;
