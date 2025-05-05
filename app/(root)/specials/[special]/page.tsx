import ProductsGridSection from "@/components/ProductsGridSection";
import { getProductsWithTag } from "@/lib/data/products";
import React from "react";

interface Props {
  params: Promise<{ special: string }>;
}

const Page: React.FC<Props> = async ({ params }) => {
  const special = (await params).special;
  const products = await getProductsWithTag(special);
  return <ProductsGridSection title={special} products={products} />;
};

export default Page;
