import React from "react";
import { getLimitedProducts } from "@/lib/data/products";
import PlantPage from "./components/PlantPage";
import { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { Messages } from "next-intl";

export const generateMetadata = async (): Promise<Metadata> => {
  const t: Messages = await getMessages();

  const title = t.TabTitles.Plant;

  return {
    title: title,
    description:
      "Designing with plant starter pack can add depth and coziness to a small space. Read our tips for using darker colors in your decor.",
    openGraph: {
      url: "/stories/plant-starter-pack",
      title: "Plant starter pack",
      description: "Designing with plant starter pack...",
    },
  };
};

const Page = async () => {
  const products = await getLimitedProducts("Plants", 3);
  return <PlantPage products={products} />;
};

export default Page;
