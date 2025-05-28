import Category from "@/components/Category";
import { categories } from "@/constants";
import {
  getFilteredVariants,
  getProductsByCategory,
} from "@/lib/data/products";
import { Metadata } from "next";
import React from "react";

interface Props {
  params: Promise<{ type: string }>;
  searchParams?: Promise<{ min?: number; max?: number; orderBy?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const type = (await params).type;
  const title = type.slice(0, 1).toUpperCase() + type.slice(1);
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
  const description = categories.find((el) => el.name === category)?.desc;

  const [products, variants] = await Promise.all([
    getProductsByCategory(category, filters),
    getFilteredVariants(category, filters),
  ]);

  return (
    <Category
      title={type}
      description={description as string}
      products={products}
      variants={variants}
    />
  );
};

export default Page;
