import Image from "next/image";
import React from "react";

const Product = () => {
  return (
    <div className="flex flex-col h-full">
      <Image
        src="/main/monstera-minia_4.jpeg"
        className="w-full rounded-md"
        height={300}
        width={400}
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
