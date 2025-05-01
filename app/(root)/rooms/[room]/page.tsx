import ProductsGridSection from "@/components/ProductsGridSection";
import { db } from "@/db/drizzle";
import { hasValueInArray } from "@/db/helpers";
import { productsTable } from "@/db/schema";
import React from "react";

interface Props {
  params: Promise<{ room: string }>;
}

const Page: React.FC<Props> = async ({ params }) => {
  const room = (await params).room;
  const products = await db
    .select()
    .from(productsTable)
    .where(hasValueInArray(productsTable.tags, "room"))
    .execute({ room });

  return <ProductsGridSection title={room} products={products} />;
};

export default Page;
