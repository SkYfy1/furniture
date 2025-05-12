import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductLink: React.FC<{ item: Product }> = ({ item }) => {
  return (
    <Link
      href={`/shop/${item.category.toLowerCase()}/${item.id}`}
      className="flex gap-4 py-2 px-4 items-center justify-between border-t-1 first:border-t-0"
    >
      <div className="flex gap-3 items-center">
        <div className="h-[70] w-[50] relative rounded-md">
          <Image
            src={item.imageUrl}
            fill
            alt="product-image"
            className="object-cover"
          />
        </div>
        <p className="font-semibold text-base">{item.name}</p>
      </div>
      <div className="text-xs leading-5">
        {!item.discount ? (
          <>
            <p className="text-base">€{item.price}.00</p>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm">€{item.discountedPrice}.00</p>
            <div className="flex gap-2 items-center">
              <span className="text-xs line-through font-semibold">
                €{item.price}.00
              </span>
              <div className="px-1 py-0.5 bg-gray-200 rounded-xs ">
                {item.discount}%
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductLink;
