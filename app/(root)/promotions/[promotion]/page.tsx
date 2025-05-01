import ProductsGridSection from "@/components/ProductsGridSection";
import { db } from "@/db/drizzle";
import { hasValueInArray } from "@/db/helpers";
import { productsTable } from "@/db/schema";
import React from "react";

interface Props {
  params: Promise<{ promotion: string }>;
}

const Page: React.FC<Props> = async ({ params }) => {
  const promotion = (await params).promotion;
  const products = await db
    .select()
    .from(productsTable)
    .where(hasValueInArray(productsTable.tags, "promotion"))
    .execute({ promotion });

  return <ProductsGridSection title={promotion} products={products} />;
};

export default Page;
