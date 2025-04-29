import Filters from "@/components/Filters";
import Product from "@/components/Product";
import { Switch } from "@/components/ui/switch";
import { categories } from "@/constants";
import { db } from "@/db/drizzle";
import { productsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import React from "react";

interface Props {
  params: Promise<{ type: string }>;
  searchParams?: Promise<{ min: string; max: string; orderBy: string }>;
}

const Page: React.FC<Props> = async ({ params, searchParams }) => {
  const type = (await params).type;
  const filters = await searchParams;
  const category = type.charAt(0).toUpperCase() + type.slice(1);
  const description = categories.find((el) => el.name === category)?.desc;

  console.log(filters);

  const products = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.category, category));

  return (
    <>
      <div className="container px-4 capitalize mb-10">
        <h2 className="text-3xl font-bold py-3.5">{type}</h2>
        <p className="mb-10">{description}</p>
        <Filters />
        <div className="text-sm font-semibold flex justify-between">
          <div>Found {products.length} matching results</div>
          <div className="flex gap-2.5 items-center">
            <span>Show variants</span>
            <Switch />
          </div>
        </div>
        <div className="grid grid-cols-2 mt-5 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {products.map((product) => (
            <Product key={product.id} data={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
