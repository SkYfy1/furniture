import ProductsGridSection from "@/components/ProductsGridSection";
import { db } from "@/db/drizzle";
import { hasValueInArray } from "@/db/helpers";
import { productsTable } from "@/db/schema";
import React from "react";

interface Props {
  params: Promise<{ special: string }>;
}

const Page: React.FC<Props> = async ({ params }) => {
  const special = (await params).special;
  const products = await db
    .select()
    .from(productsTable)
    .where(hasValueInArray(productsTable.tags, "special"))
    .execute({ special });
  return <ProductsGridSection title={special} products={products} />;
};

export default Page;
