import ProductsGridSection from "@/components/ProductsGridSection";
import { getProductsWithTag } from "@/lib/data/products";
import { Metadata } from "next";
import React from "react";

interface Props {
  params: Promise<{ special: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const special = (await params).special;
  return {
    title: "Specials",
    openGraph: {
      url: `/rooms/${special}`,
      title: `FRNTR | ${special.toUpperCase()}`,
      description: "Specials...",
    },
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const special = (await params).special;
  const products = await getProductsWithTag(special);

  return (
    <section className="container px-4 capitalize mb-10 mt-6">
      <h2 className="text-3xl font-bold py-3.5">{special}</h2>
      <span className="text-sm font-semibold">
        Found {products.length} matching results
      </span>
      <ProductsGridSection categoryName={special} products={products} />
    </section>
  );
};

export default Page;
