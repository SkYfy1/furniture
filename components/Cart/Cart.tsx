"use client";

import React, { useCallback, useState } from "react";
import CartItem from "./CartItem";
import { useAppSelector } from "@/lib/hooks";
import Coupon from "./Coupon";
import CartSummary from "./CartSummary";
import Link from "next/link";
import EmptyCart from "./EmptyCart";
import { useTranslations } from "next-intl";

const Cart = () => {
  const cart = useAppSelector((state) => state.cart.items);
  const [, setCoupon] = useState("");
  const handleAddCoupon = useCallback((text: string) => {
    setCoupon(text);
  }, []);
  const t = useTranslations("CartPage");

  if (!cart.length)
    return (
      <EmptyCart
        title={t("Empty.title")}
        subTitle={t("Empty.subTitle")}
        button={t("Buttons.back")}
      />
    );

  const totalPrice = cart.reduce((cur, acc) => {
    if (!acc.discount) return cur + acc.oldPrice * acc.quantity;
    return cur + acc.newPrice * acc.quantity;
  }, 0);

  const totalDiscount = cart.reduce((cur, acc) => {
    if (!acc.discount) return cur + 0;
    return cur + (acc.oldPrice - acc.newPrice) * acc.quantity;
  }, 0);

  const tax = totalPrice > 1000 ? Math.floor((totalPrice * 12) / 100) : 0;

  return (
    <section className="flex flex-col gap-3 w-full">
      <h1 className="text-xl font-semibold mb-4">{t("title")}</h1>
      {cart?.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}
      <div>
        <div className=" flex flex-col lg:flex-row gap-5 pl-2">
          <Coupon submitCoupon={handleAddCoupon} />
          <CartSummary
            summary={totalPrice}
            discount={totalDiscount}
            tax={tax}
          />
        </div>
        <div className="flex justify-between font-semibold mt-10">
          <button className="px-4 py-3 bg-gray text-black rounded-sm text-sm">
            <Link href="/">{t("Buttons.back")}</Link>
          </button>
          <button className="px-10 py-3 bg-black text-white rounded-sm text-sm">
            <Link href="/checkout">{t("Buttons.checkout")}</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
