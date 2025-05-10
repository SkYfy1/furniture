import ProductsGridSection from "@/components/ProductsGridSection";
import { getProductsWithTag } from "@/lib/data/products";
import React from "react";

interface Props {
  params: Promise<{ special: string }>;
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
