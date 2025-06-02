import ProductsGridSection from "@/components/ProductsGridSection";
import { getProductsWithTag } from "@/lib/data/products";
import { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";
import React from "react";

interface Props {
  params: Promise<{ promotion: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const promotion = (await params).promotion;
  const t = await getMessages();

  const title = t.Header.Nav.promotions.title;

  return {
    title: title,
    openGraph: {
      url: `/promotions/${promotion}`,
      title: `FRNTR | ${promotion.toUpperCase()}`,
      description: "Promotions...",
    },
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const promotion = (await params).promotion;
  const products = await getProductsWithTag(promotion);
  const tPromotion = await getTranslations("Promotions");
  const t = await getTranslations("ShopPage");

  return (
    <section className="container px-4 capitalize mb-10 mt-6">
      <h2 className="text-3xl font-bold py-3.5">
        {tPromotion(promotion as "vegan")}
      </h2>
      <span className="text-sm font-semibold">
        {t(`Filtration.found`, { quantity: products.length })}
      </span>
      <ProductsGridSection categoryName={promotion} products={products} />
    </section>
  );
};

export default Page;
