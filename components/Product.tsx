import Image from "next/image";
import Link from "next/link";
import React from "react";

const Product: React.FC<{ data: Product }> = ({ data }) => {
  return (
    <Link
      href={`/shop/${data.category.toLowerCase()}/${data.id}`}
      className="flex flex-col h-full pb-10 min-h-[351] min-w-fit lg:min-w-0"
    >
      <div className="h-[300] w-[180] xl:h-[300] xl:w-[230] 2xl:size-[300] relative">
        {data.discount && (
          <div className="absolute -translate-x-1/4 translate-y-1/4 top-0 right-0 size-10 flex justify-center items-center bg-green-900 z-10 rounded-full text-xs text-white">
            -{data.discount}%
          </div>
        )}
        <Image
          src={data.imageUrl}
          className="rounded-md object-cover"
          fill
          alt="product-image"
        />
      </div>
      <div className="px-1 py-0.5 mt-2">
        <p>{data.name}</p>
        {data.discount ? (
          <>
            <span className="font-semibold text-[10px] line-through text-sm">
              €{data.price}.00
            </span>
            <div className="flex gap-2 items-center font-semibold">
              <div className="text-green-800">€{data.discountedPrice}.00</div>
              <div className="text-xs bg-gray px-2 py-1 rounder-md">
                {data.discount}%
              </div>
            </div>
          </>
        ) : (
          <span className="font-semibold text-sm">€{data.price}.00</span>
        )}
      </div>
    </Link>
  );
};

export default Product;

// size-[160] sm:size-[170] md:size-[350] lg:h-[300] lg:w-[180]
