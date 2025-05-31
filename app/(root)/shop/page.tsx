import CustomLink from "@/components/CustomLink";
import ProductSlider from "@/components/ProductSlider";
import SaleOverview from "@/components/SaleOverview";
import { categories } from "@/constants";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";

export const metadata: Metadata = {
  title: "Shop",
  openGraph: {
    url: "/shop",
    title: "Shop",
    description: "Incredible deals. Top-of-the-line design for less.",
  },
};

const Page = async () => {
  const t = await getTranslations("ShopPage");

  return (
    <>
      <SaleOverview />
      <div className="mt-20 mb-10 px-5 flex flex-col gap-4 container">
        <h2 className="text-sm font-semibold">{t("Categories.title")}</h2>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((category) => (
            <CustomLink
              title={t(
                `Categories.category.${category.name}.name` as "Categories.category.Sofas.name"
              )}
              link={category.route}
              key={category.route}
            />
          ))}
        </div>
      </div>
      {categories.map((category) => (
        <ProductSlider
          title={t(
            `Categories.category.${category.name}.name` as "Categories.category.Sofas.name"
          )}
          category={category.name}
          description={t(
            `Categories.category.${category.name}.description` as "Categories.category.Sofas.description"
          )}
          key={category.name}
        />
      ))}
    </>
  );
};

export default Page;
