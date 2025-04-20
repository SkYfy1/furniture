import React from "react";
import MotionList from "./MotionList";
import Product from "./Product";
import CustomLink from "./CustomLink";

const ProductSlider: React.FC<{ title: string; text: string }> = ({
  title,
  text,
}) => {
  return (
    <section className="container border-t border-gray-200 pt-18 lg:pb-32 px-4 lg:px-0">
      <div className="flex flex-col md:flex-row justify-between items-center pb-10">
        <div className="flex flex-col gap-2 self-start">
          <h2 className="font-semibold text-2xl">{title}</h2>
          <p className="text-sm hidden md:block">{text}</p>
        </div>
        <CustomLink
          title="View all products"
          link="/shop/plants"
          className="w-full text-center mt-10"
        />
      </div>
      <MotionList>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </MotionList>
    </section>
  );
};

export default ProductSlider;
