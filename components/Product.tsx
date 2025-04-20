import Image from "next/image";
import React from "react";

const Product = () => {
  return (
    <div className="flex flex-col h-full pb-10 min-h-[351] min-w-1/2 lg:min-w-0">
      <Image
        src="/main/drracaena_5.jpeg"
        className="rounded-md flex-1"
        height={400}
        width={304}
        alt="product-image"
      />
      <div className="px-1 py-0.5">
        <p>Golden Pothis</p>
        <span className="font-semibold">€10.00</span>
      </div>
    </div>
  );
};

export default Product;
