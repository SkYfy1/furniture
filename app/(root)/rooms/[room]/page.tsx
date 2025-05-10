import ProductsGridSection from "@/components/ProductsGridSection";
import { getProductsWithTag } from "@/lib/data/products";
import React from "react";

interface Props {
  params: Promise<{ room: string }>;
}

const Page: React.FC<Props> = async ({ params }) => {
  const room = (await params).room;
  const products = await getProductsWithTag(room);

  return (
    <section className="container px-4 capitalize mb-10 mt-6">
      <h2 className="text-3xl font-bold py-3.5">{room}</h2>
      <span className="text-sm font-semibold">
        Found {products.length} matching results
      </span>
      <ProductsGridSection categoryName={room} products={products} />
    </section>
  );
};

export default Page;
