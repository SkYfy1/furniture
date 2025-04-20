import CustomLink from "@/components/CustomLink";
import ProductSlider from "@/components/ProductSlider";
import SaleOverview from "@/components/SaleOverview";
import React from "react";

const Page = () => {
  return (
    <>
      <SaleOverview />
      <div className="mt-20 mb-10 px-5 flex flex-col gap-4 container">
        <h2 className="text-sm font-semibold">Browse categories</h2>
        <div className="flex flex-wrap gap-1.5">
          <CustomLink title="Flowers" link="/shop/flowers" />
          <CustomLink title="Plants" link="/shop/plants" />
          <CustomLink title="Kitchen" link="/shop/kitchen" />
          <CustomLink title="Wall Art" link="/shop/wall-art" />
          <CustomLink title="Sofas" link="/shop/sofas" />
          <CustomLink title="Phones" link="/shop/phones" />
        </div>
      </div>
      <ProductSlider
        title="Flowers"
        text="Plants of all shapes and sizes for your home. With a little TLC, you’ll enjoy them for years to come."
      />
      <ProductSlider
        title="Plants"
        text="Plants of all shapes and sizes for your home. With a little TLC, you’ll enjoy them for years to come."
      />
      <ProductSlider
        title="Kitchen"
        text="Plants of all shapes and sizes for your home. With a little TLC, you’ll enjoy them for years to come."
      />
    </>
  );
};

export default Page;
