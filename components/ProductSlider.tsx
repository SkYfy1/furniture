import React from "react";
import MotionList from "./MotionList";
import Product from "./Product";
import CustomLink from "./CustomLink";
import { getProductsByCategory } from "@/lib/data/products";

interface Props {
  category: string;
  description: string;
}

const ProductSlider: React.FC<Props> = async ({ category, description }) => {
  const products = await getProductsByCategory(category);

  return (
    <section className="container border-t border-gray-200 pt-18 lg:pb-32 px-4 md:px-10 2xl:px-0">
      <div className="flex flex-col lg:flex-row justify-between items-center pb-10">
        <div className="flex flex-col gap-2 self-start lg:self-auto">
          <h2 className="font-semibold text-2xl">{category}</h2>
          <p className="text-sm hidden xl:block">{description}</p>
        </div>
        <CustomLink
          title="View all products"
          link={`/shop/${category.toLowerCase()}`}
          className="w-full lg:w-fit text-center mt-10 lg:mt-0"
        />
      </div>
      <MotionList>
        {products.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </MotionList>
    </section>
  );
};

export default ProductSlider;
