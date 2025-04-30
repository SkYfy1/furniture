import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BuyBox: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <section className="lg:w-2/3">
      <div className="sticky top-22 flex flex-col gap-4">
        <div className="flex gap-2 text-sm">
          {product.tags?.map((tag) => (
            <Link
              href={`/${tag}`}
              className="bg-gray px-2 py-1 rounded-md font-semibold"
              key={tag}
            >
              {tag}
            </Link>
          ))}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">Sulfur Cosmos</h1>
          <h2 className="text-sm">Sulfur Cosmos</h2>
        </div>
        <div>
          {product.discount ? (
            <>
              <span className="font-semibold text-[12px] line-through text-sm">
                €{product.price}.00
              </span>
              <div className="flex gap-2 items-center font-semibold">
                <div className="text-green-price text-2xl">
                  €{product.discountedPrice}.00
                </div>
                <div className="text-sm bg-gray px-2 py-1 rounder-md">
                  {product.discount}%
                </div>
              </div>
            </>
          ) : (
            <span className="font-semibold text-sm">€{product.price}.00</span>
          )}
        </div>
        <div className="flex flex-col lg:flex-row gap-1.5 mb-3">
          <button
            className={cn(
              "lg:text-lg font-semibold hover:bg-gray-100 px-5 py-3 rounded-md bg-black text-white hover:text-black w-full cursor-pointer duration-300 border border-black"
            )}
          >
            Add to cart
          </button>
          <button
            className={cn(
              "lg:text-lg font-semibold hover:bg-gray-100 px-5 py-3 rounded-md bg-black text-white hover:text-black w-full cursor-pointer duration-300 border border-black"
            )}
          >
            Buy with ///
          </button>
        </div>
        <div className="border-t py-4 flex justify-between items-center text-sm">
          <div className="flex gap-2 items-center">
            <Image
              src="/svg/stockIcon.svg"
              height={18}
              width={18}
              alt="stock-icon"
            />
            <p className="font-semibold">Online</p>
            <div className="size-2.5 rounded-full bg-green-price"></div>
          </div>
          <p>20+ in stock</p>
        </div>
      </div>
    </section>
  );
};

export default BuyBox;
