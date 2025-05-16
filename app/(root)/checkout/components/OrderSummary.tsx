"use client";

import CartItem from "@/components/Cart/CartItem";
import CartSummary from "@/components/Cart/CartSummary";
import React from "react";

interface Props {
  cart: CartItem[];
  totalPrice: number;
  totalDiscount: number;
  tax: number;
}

const OrderSummary: React.FC<Props> = ({
  cart,
  totalDiscount,
  totalPrice,
  tax,
}) => {
  return (
    <div className="p-5 border flex-1 rounded-md mt-3">
      <h2 className="font-semibold text-lg">Order Summary</h2>
      <div className="flex-col flex gap-2 pt-4 min-h-[95%] justify-between">
        {cart?.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
        <CartSummary summary={totalPrice} discount={totalDiscount} tax={tax} />
      </div>
    </div>
  );
};

export default OrderSummary;
