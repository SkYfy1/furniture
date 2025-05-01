"use client";

import React, { useState } from "react";
import ProductMini from "./ProductMini";
import { cn } from "@/lib/utils";

const StoriesOffer: React.FC<{
  products: Product[];
  selected?: number | null;
}> = ({ products }) => {
  const [offerObjects, setOfferObjects] = useState(
    products.map((el) => ({ id: el.id, quantity: 1 }))
  );
  const fullPrice = products.reduce((prev, cur) => {
    const currentQuantity = offerObjects?.find(
      (el) => el.id === cur.id
    )?.quantity;
    return (
      prev +
      (cur.discount! ? cur.discountedPrice! : cur.price) * currentQuantity!
    );
  }, 0);

  const updateQuantity = (id: string, value: number) => {
    setOfferObjects((prev) =>
      prev.map((el) => (el.id === id ? { id, quantity: value } : el))
    );
  };

  return (
    <div className="px-6 w-full lg:w-5/12">
      <h2 className="capitalize font-semibold text-3xl pb-2">Dark Colors</h2>
      <p className="border-b pb-3">
        Designing with dark colors can add depth and coziness to a small space.
        Read our tips for using darker colors in your decor.
      </p>
      <div className="sticky top-20">
        <section className="mt-4">
          {products.map((product) => {
            const quantity = offerObjects.find(
              (el) => el.id === product.id
            )?.quantity;
            console.log(quantity);
            return (
              <ProductMini
                key={product.id}
                data={product}
                quantity={quantity!}
                changeQuantity={updateQuantity}
              />
            );
          })}
        </section>
        <div className="flex justify-between mt-5 pt-5 items-center">
          <span className="text-2xl font-semibold text-green-900">
            €{fullPrice}.00
          </span>
          <div className="flex flex-col lg:flex-row gap-1.5">
            <button
              className={cn(
                "lg:text-lg font-semibold hover:bg-gray-100 px-5 py-3 rounded-md bg-black text-white hover:text-black duration-150"
              )}
            >
              Add to cart
            </button>
            <button
              className={cn(
                "lg:text-lg font-semibold hover:bg-gray-100 px-5 py-3 rounded-md bg-black text-white hover:text-black duration-150"
              )}
            >
              Buy with ///
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoriesOffer;
