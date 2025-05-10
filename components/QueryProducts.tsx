import { getQueryProduct } from "@/lib/data/products";
import React from "react";
import Product from "./Product";

const QueryProducts: React.FC<{ query: string }> = async ({ query }) => {
  const products = await getQueryProduct(query);
  console.log(products);
  return (
    <div className="absolute bg-white p-5 rounded-md top-13 left-70 z-50 flex flex-col gap-2">
      {products.map((item) => (
        <Product key={item.id} data={item} name={item.name} />
      ))}
    </div>
  );
};

export default QueryProducts;
