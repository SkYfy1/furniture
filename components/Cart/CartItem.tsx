import { useAppDispatch } from "@/lib/hooks";
import Image from "next/image";
import React from "react";
import {
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
} from "@/lib/features/cartSlice";
import { useTranslations } from "next-intl";

const CartItem = ({ item }: { item: CartItem }) => {
  const dispatch = useAppDispatch();
  const t = useTranslations("CartPage.CartItem");
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
              <p>
                {t("total")}: €{item.newPrice * item.quantity}.00
              </p>
              <div>
                <span className="text-xs line-through font-semibold">
                  €{item.oldPrice}.00
                </span>
                <div className="flex gap-2 items-center">
                  <span>
                    {t("savings")}: €
                    {(item.oldPrice - item.newPrice!) * item.quantity}
                    .00
                  </span>
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
        <div className="relative">
          <p className="font-semibold h-[25] w-[25] text-center">
            {item.quantity}
          </p>
          {item.quantity === item.available && (
            <span className="text-[0.5rem]  font-semibold absolute top-0 left-1/2 translate-x-1/2">
              MAX
            </span>
          )}
        </div>
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
