"use client";

import React from "react";
import CartItem from "./CartItem";
import { useAppSelector } from "@/lib/hooks";

const Cart = () => {
  const cart = useAppSelector((state) => state.cart.items);
  return (
    <section className="flex flex-col gap-3">
      {cart?.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}
    </section>
  );
};

export default Cart;
