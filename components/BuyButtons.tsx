"use client";

import { useAppDispatch } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import React from "react";
import { addItem } from "@/lib/features/cartSlice";

interface Props {
  payload: CartItem;
}

const BuyButtons: React.FC<Props> = ({ payload }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col lg:flex-row gap-1.5 mb-3">
      <button
        onClick={() => {
          console.log("dad");
          dispatch(addItem(payload));
        }}
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
  );
};

export default BuyButtons;
