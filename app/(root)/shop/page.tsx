import CustomLink from "@/components/CustomLink";
import ProductSlider from "@/components/ProductSlider";
import SaleOverview from "@/components/SaleOverview";
import { categories } from "@/constants";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Shop",
  openGraph: {
    url: "/shop",
    title: "Shop",
    description: "Incredible deals. Top-of-the-line design for less.",
  },
};

const Page = () => {
  return (
    <>
      <SaleOverview />
      <div className="mt-20 mb-10 px-5 flex flex-col gap-4 container">
        <h2 className="text-sm font-semibold">Browse categories</h2>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((category) => (
            <CustomLink
              title={category.name}
              link={category.route}
              key={category.route}
            />
          ))}
        </div>
      </div>
      {categories.map((category) => (
        <ProductSlider
          category={category.name}
          description={category.desc}
          key={category.name}
        />
      ))}
    </>
  );
};

export default Page;
