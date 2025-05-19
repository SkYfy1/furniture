"use client";

import React, { useEffect } from "react";
import OrderForm from "./OrderForm";
import OrderSummary from "./OrderSummary";
import { CreateOrder } from "@/lib/actions/order";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

interface Props {
  userId: string;
  action: CreateOrder;
}

const Checkout: React.FC<Props> = ({ userId, action }) => {
  const cart = useAppSelector((state) => state.cart.items);
  const router = useRouter();

  const totalPrice = cart.reduce((cur, acc) => {
    if (!acc.discount) return cur + acc.oldPrice * acc.quantity;
    return cur + acc.newPrice * acc.quantity;
  }, 0);

  const totalDiscount = cart.reduce((cur, acc) => {
    if (!acc.discount) return cur + 0;
    return cur + (acc.oldPrice - acc.newPrice) * acc.quantity;
  }, 0);

  const tax = totalPrice > 1000 ? Math.floor((totalPrice * 12) / 100) : 0;

  const cartItems = cart.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    price: item.newPrice,
  }));

  // If cart is empty - redirect to main page!

  useEffect(() => {
    if (cart.length === 0) router.push("/");
  }, [cart, router]);

  return (
    <section className="flex flex-col md:flex-row gap-24">
      <OrderForm
        cartItems={cartItems}
        userId={userId}
        action={action}
        summaryPrice={totalPrice + tax}
      />
      <OrderSummary
        cart={cart}
        totalDiscount={totalDiscount}
        totalPrice={totalPrice}
        tax={tax}
      />
    </section>
  );
};

export default Checkout;
