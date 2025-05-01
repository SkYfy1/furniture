import StoriesOffer from "@/components/StoriesOffer";
import TipSection from "@/components/TipSection";
import { db } from "@/db/drizzle";
import { productsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import React from "react";

const Page: React.FC = async () => {
  const products = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.category, "Plants"))
    .limit(3);
  return (
    <div className="stories-container relative">
      <div className="lg:w-7/12">
        <div className="w-full h-[295] md:h-[430] xl:h-[550] 2xl:h-[700] relative">
          <Image
            src="/main/darkColors.jpeg"
            fill
            className="object-cover rounded-md"
            alt="category-image"
          />
        </div>
        <TipSection
          title="Pair With Warm Neutrals"
          paragraph="If you paint your room with a dramatic dark color, pair this with
          neutral furnishings for a comfortable, inviting look."
        />
        <div className="flex flex-col gap-2 pt-24">
          <div className="w-full h-[238] lg:h-[300] relative">
            <Image
              src="/main/alocasia.jpeg"
              fill
              className="object-cover rounded-md"
              alt="category-image"
            />
          </div>
          <div className="w-full h-[238] lg:h-[300] relative">
            <Image
              src="/main/sofa.jpeg"
              fill
              className="object-cover rounded-md"
              alt="category-image"
            />
          </div>
        </div>
      </div>
      <StoriesOffer products={products} />
    </div>
  );
};

export default Page;
