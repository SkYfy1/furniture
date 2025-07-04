import Category from "@/components/Category";
import {
  getCategoryPriceRange,
  getFilteredVariants,
  getProductsByCategory,
} from "@/lib/data/products";
import { Metadata } from "next";
import { getMessages } from "next-intl/server";
import React from "react";

interface Props {
  params: Promise<{ type: string }>;
  searchParams?: Promise<{ min?: number; max?: number; orderBy?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const type = (await params).type;
  const cap = type.slice(0, 1).toUpperCase() + type.slice(1);
  const t = await getMessages();
  // idk
  const title = t.ShopPage.Categories.category[cap as "Sofas"].name;

  return {
    title: title,
    openGraph: {
      url: type,
      title: `FRNTR | ${title}`,
      description: "Incredible deals. Top-of-the-line design for less.",
    },
  };
}

const Page: React.FC<Props> = async ({ params, searchParams }) => {
  const type = (await params).type;
  const filters = await searchParams;
  const category = type.charAt(0).toUpperCase() + type.slice(1);

  const [products, variants, categoryPriceRange] = await Promise.all([
    getProductsByCategory(category, filters),
    getFilteredVariants(category, filters),
    getCategoryPriceRange(category),
  ]);

  return (
    <Category
      title={type}
      products={products}
      variants={variants}
      priceRange={categoryPriceRange}
    />
  );
};

export default Page;
