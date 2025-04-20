import Image from "next/image";
import React from "react";

const Product = () => {
  return (
    <div className="flex flex-col h-full pb-10 min-h-[351] min-w-1/2 lg:min-w-0">
      <div className="lg:size-[200] 2xl:size-[300] size-[160] sm:size-[170] md:size-[350] relative">
        <Image
          src="/main/drracaena_5.jpeg"
          className="rounded-md object-cover"
          fill
          alt="product-image"
        />
      </div>
      <div className="px-1 py-0.5 mt-2">
        <p>Golden Pothis</p>
        <span className="font-semibold">€10.00</span>
      </div>
    </div>
  );
};

export default Product;
