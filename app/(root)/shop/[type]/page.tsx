import ProductsGridSection from "@/components/ProductsGridSection";
import { categories } from "@/constants";
import { getProductsByCategory, getVariantsJoin } from "@/lib/data/products";
import React from "react";

interface Props {
  params: Promise<{ type: string }>;
  searchParams?: Promise<{ min: string; max: string; orderBy: string }>;
}

const Page: React.FC<Props> = async ({ params, searchParams }) => {
  const type = (await params).type;
  const filters = await searchParams; // eslint-disable-line
  const category = type.charAt(0).toUpperCase() + type.slice(1);
  const description = categories.find((el) => el.name === category)?.desc;

  const [products, variants] = await Promise.all([
    getProductsByCategory(category),
    getVariantsJoin(category),
  ]);

  return (
    <>
      <ProductsGridSection
        title={type}
        description={description!}
        products={products}
        showFilters={true}
        variants={variants}
      />
    </>
  );
};

export default Page;
