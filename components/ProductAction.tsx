"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import React from "react";
import { addItem } from "@/lib/features/cartSlice";
import {
  addToWishlist,
  deleteFromWishlist,
} from "@/lib/features/wishlistSlice";

interface Props {
  payload: CartItem;
}

const ProductAction: React.FC<Props> = ({ payload }) => {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.list);

  const inWishlist = wishlist.some((el) => el === payload.id);

  const handleAddToWish = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inWishlist) {
      dispatch(deleteFromWishlist(payload.id));
    } else {
      dispatch(addToWishlist(payload.id));
    }
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addItem(payload));
  };

  return (
    <div className="z-15 flex-col md:flex-row flex items-center self-start">
      <button
        aria-label="Add to wishlist button"
        className="hover:bg-gray transition-all rounded-sm cursor-pointer"
        onClick={handleAddToWish}
      >
        <Image
          width={22}
          height={22}
          src={inWishlist ? "/svg/heart1.svg" : "/svg/heart2.svg"}
          alt=""
          aria-hidden="true"
          role="presentation"
        />
      </button>
      {payload.available >= 1 && (
        <button
          aria-label="Add to cart button"
          className="hover:bg-gray transition-all rounded-sm cursor-pointer"
          onClick={handleAddToCart}
        >
          <Image
            width={25}
            height={25}
            src="/svg/basketIcon.svg"
            alt=""
            aria-hidden="true"
            role="presentation"
          />
        </button>
      )}
    </div>
  );
};

export default ProductAction;
