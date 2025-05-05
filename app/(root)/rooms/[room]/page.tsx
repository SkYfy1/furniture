import ProductsGridSection from "@/components/ProductsGridSection";
import { getProductsWithTag } from "@/lib/data/products";
import React from "react";

interface Props {
  params: Promise<{ room: string }>;
}

const Page: React.FC<Props> = async ({ params }) => {
  const room = (await params).room;
  const products = await getProductsWithTag(room);

  return <ProductsGridSection title={room} products={products} />;
};

export default Page;
