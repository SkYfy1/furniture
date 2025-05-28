import { auth } from "@/auth";
import BuyBox from "@/components/BuyBox";
import ProductDimensions from "@/components/ProductDimensions";
import { getProductById, getVariants } from "@/lib/data/products";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sku: string }>;
}

interface MetadataProps {
  params: Promise<{ id: string; type: string }>;
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { id, type } = await params;

  const product = await getProductById(id);

  const name = product.name;
  const description = product.description;

  return {
    title: name,
    description,
    openGraph: {
      title: name,
      description: `Buy ${name} for your home. Price: €${
        product.discountedPrice ?? product.price
      }`,
      url: `/shop/${type}/${id}`,
      images: product.imageUrl,
    },
  };
}

const Page: React.FC<Props> = async ({ params, searchParams }) => {
  const id = (await params).id;
  const searchPars = (await searchParams).sku;
  const [product, variants] = await Promise.all([
    getProductById(id),
    getVariants(id),
  ]);
  const session = await auth();

  const defaultSku =
    searchPars ?? variants[Math.floor(variants.length / 2)]?.sku;

  const selectedItem = variants.find((variant) => variant.sku === defaultSku);

  return (
    <div className="stories-container mt-0">
      <div className="w-full">
        <div className="w-full h-[600] max-h-[1400] relative">
          <Image
            src={selectedItem?.imageUrl ?? product.imageUrl}
            fill
            className="object-contain"
            alt={`${product.name}-image`}
          />
        </div>
        <ProductDimensions dimensions={product.dimensions as Dimensions} />
        <div className="py-36">
          <h2 className="font-semibold">You might also be interested in</h2>
        </div>
      </div>
      <BuyBox
        userId={session?.user?.id as string}
        product={product}
        variants={variants}
        selected={selectedItem as Variant}
      />
    </div>
  );
};

export default Page;
