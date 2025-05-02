import { useAppDispatch } from "@/lib/hooks";
import Image from "next/image";
import React from "react";
import {
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
} from "@/lib/features/cartSlice";

const CartItem = ({ item }: { item: CartItem }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-between items-center bg-gray rounded-md py-8 px-5">
      <div className="flex gap-3">
        <div className="h-[70] w-[50] relative rounded-md">
          <Image
            src={item.image}
            fill
            alt="product-image"
            className="object-cover"
          />
        </div>
        <div className="text-xs leading-5">
          <p className="font-semibold text-base pb-0.5">{item.name}</p>
          {!item.discount ? (
            <>
              <p>€{item.oldPrice}.00</p>
              <p>Total: €{item.oldPrice * item.quantity}.00</p>
            </>
          ) : (
            <>
              <p>€{item.newPrice}.00</p>
              <p>Total: €{item.newPrice * item.quantity}.00</p>
              <div>
                <span className="text-xs line-through font-semibold">
                  €{item.oldPrice}.00
                </span>
                <div className="flex gap-2 items-center">
                  <span>Savings: €{item.oldPrice - item.newPrice!}.00</span>
                  <div className="px-1 py-0.5 bg-gray-200 rounded-xs ">
                    {item.discount}%
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => dispatch(increaseQuantity(item.id))}
          className="cursor-pointer hover:bg-gray h-[25] w-[25]"
        >
          +
        </button>
        <p className="font-semibold h-[25] w-[25] text-center">
          {item.quantity}
        </p>
        {item.quantity > 1 ? (
          <button
            onClick={() => dispatch(decreaseQuantity(item.id))}
            className="cursor-pointer hover:bg-gray h-[25] w-[25]"
          >
            -
          </button>
        ) : (
          <button
            onClick={() => dispatch(deleteItem(item.id))}
            className="cursor-pointer hover:bg-gray h-[25] w-[25]"
          >
            <Image
              src="/svg/trashIcon.svg"
              height={25}
              width={25}
              alt="trash icon"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
