import React from "react";
import ProductMini from "./ProductMini";
import { cn } from "@/lib/utils";

const StoriesOffer = () => {
  return (
    <div className="px-6 lg:max-w-1/3">
      <h2 className="capitalize font-semibold text-3xl pb-2">Dark Colors</h2>
      <p className="border-b pb-3">
        Designing with dark colors can add depth and coziness to a small space.
        Read our tips for using darker colors in your decor.
      </p>
      <div className="sticky top-20">
        <section className="mt-4">
          <ProductMini />
          <ProductMini />
          <ProductMini />
        </section>
        <div className="flex justify-between mt-5 pt-5 items-center">
          <span className="text-2xl font-semibold text-green-900">€369.00</span>
          <div className="flex flex-col gap-1.5">
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
