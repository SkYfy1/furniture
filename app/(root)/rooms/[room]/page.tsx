import ProductsGridSection from "@/components/ProductsGridSection";
import { getProductsWithTag } from "@/lib/data/products";
import { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";
import React from "react";

interface Props {
  params: Promise<{ room: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const room = (await params).room;

  const t = await getMessages();

  const title = t.Header.Nav.rooms.title;

  return {
    title: title,
    openGraph: {
      url: `/rooms/${room}`,
      title: `FRNTR | ${room.toUpperCase()}`,
      description: "Promotions...",
    },
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const room = (await params).room;
  const products = await getProductsWithTag(room);
  const tRooms = await getTranslations("Rooms");
  const t = await getTranslations("ShopPage");

  return (
    <section className="container px-4 capitalize mb-10 mt-6">
      <h2 className="text-3xl font-bold py-3.5">
        {tRooms(room as "furniture")}
      </h2>
      <span className="text-sm font-semibold">
        {t(`Filtration.found`, { quantity: products.length })}
      </span>
      <ProductsGridSection categoryName={room} products={products} />
    </section>
  );
};

export default Page;
