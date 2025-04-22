import Image from "next/image";
import React from "react";

const ProductMini = () => {
  return (
    <div className="flex gap-4 h-full min-h-fit justify-between min-w-fit lg:min-w-0 py-3 px-2 mt-0 border-b">
      <div className="h-[100] w-[80] relative">
        <Image
          src="/main/drracaena_5.jpeg"
          className="rounded-md object-cover"
          fill
          alt="product-image"
        />
      </div>
      <div className="px-1 py-0.5 mt-2 text-sm flex-1">
        <p className="mb-1">Golden Pothis</p>
        <span className="font-semibold">€10.00</span>
      </div>
      <div className="flex flex-col">
        <button className="p-2">+</button>
        <input
          type="number"
          className="text-center text-sm"
          defaultValue={1}
          max={10}
          min={1}
        />
        <button className="p-2">-</button>
      </div>
    </div>
  );
};

export default ProductMini;
