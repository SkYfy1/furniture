import ProductsGridSection from "@/components/ProductsGridSection";
import { getProductsWithTag } from "@/lib/data/products";
import React from "react";

interface Props {
  params: Promise<{ promotion: string }>;
}

const Page: React.FC<Props> = async ({ params }) => {
  const promotion = (await params).promotion;
  const products = await getProductsWithTag(promotion);

  return <ProductsGridSection title={promotion} products={products} />;
};

export default Page;
