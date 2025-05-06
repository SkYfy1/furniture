"use client";

import React, { useCallback, useState } from "react";
import CartItem from "./CartItem";
import { useAppSelector } from "@/lib/hooks";
import Coupon from "./Coupon";
import CartSummary from "./CartSummary";
import Link from "next/link";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const cart = useAppSelector((state) => state.cart.items);
  const [, setCoupon] = useState("");
  const handleAddCoupon = useCallback((text: string) => {
    setCoupon(text);
  }, []);

  if (!cart.length) return <EmptyCart />;

  return (
    <section className="flex flex-col gap-3 w-full">
      <h1 className="text-xl font-semibold mb-4">Cart</h1>
      {cart?.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}
      <div>
        <div className=" flex flex-col lg:flex-row gap-5 pl-2">
          <Coupon submitCoupon={handleAddCoupon} />
          <CartSummary />
        </div>
        <div className="flex justify-between font-semibold mt-10">
          <button className="px-4 py-3 bg-gray text-black rounded-sm text-sm">
            <Link href="/">Back</Link>
          </button>
          <button className="px-10 py-3 bg-black text-white rounded-sm text-sm">
            <Link href="/checkout">Checkout</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
