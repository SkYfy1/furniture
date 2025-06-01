import ProductsGridSection from "@/components/ProductsGridSection";
import { getProductsWithTag } from "@/lib/data/products";
import { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";
import React from "react";

interface Props {
  params: Promise<{ special: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const special = (await params).special;

  const t = await getMessages();

  const title = t.Header.Nav.specials.title;
  return {
    title: title,
    openGraph: {
      url: `/specials/${special}`,
      title: `FRNTR | ${special.toUpperCase()}`,
      description: "Specials...",
    },
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const special = (await params).special;
  const products = await getProductsWithTag(special);
  const t = await getTranslations("ShopPage");
  const tSpecials = await getTranslations("Specials");

  return (
    <section className="container px-4 capitalize mb-10 mt-6">
      <h2 className="text-3xl font-bold py-3.5">
        {tSpecials(special as "3-for-2")}
      </h2>
      <span className="text-sm font-semibold">
        {t(`Filtration.found`, { quantity: products.length })}
      </span>
      <ProductsGridSection categoryName={special} products={products} />
    </section>
  );
};

export default Page;
