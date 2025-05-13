import React from "react";
import { getLimitedProducts } from "@/lib/data/products";
import PlantPage from "./components/PlantPage";

const Page = async () => {
  const products = await getLimitedProducts("Plants", 3);
  return <PlantPage products={products} />;
};

export default Page;
