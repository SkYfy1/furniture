import BuyBox from "@/components/BuyBox";
import ProductDimensions from "@/components/ProductDimensions";
import { db } from "@/db/drizzle";
import { productsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import React from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const Page: React.FC<Props> = async ({ params }) => {
  const id = (await params).id;
  const product = (
    await db.select().from(productsTable).where(eq(productsTable.id, id))
  )[0];
  return (
    // <div className="flex flex-col-reverse lg:flex-row gap-20 px-6 mt-20 container relative">
    <div className="stories-container">
      <div className="w-full">
        <div className="w-full h-[600] max-h-[1400] relative">
          <Image
            src={product.imageUrl}
            fill
            className="object-cover"
            alt={`${product.name}-image`}
          />
        </div>
        <ProductDimensions dimensions={product.dimensions as Dimensions} />
        <div className="py-36">
          <h2 className="font-semibold">You might also be interested in</h2>
        </div>
      </div>
      <BuyBox product={product} />
    </div>
  );
};

export default Page;
