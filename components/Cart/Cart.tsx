"use client";

import React from "react";
import CartItem from "./CartItem";
import { useAppSelector } from "@/lib/hooks";
import Coupon from "./Coupon";
import CartSummary from "./CartSummary";
import Link from "next/link";
import EmptyCart from "./EmptyCart";
import { useTranslations } from "next-intl";
import { calculateCart } from "@/lib/utils";

const Cart = () => {
  const cart = useAppSelector((state) => state.cart.items);
  const couponData = useAppSelector((state) => state.cart.coupon);
  const t = useTranslations("CartPage");

  if (!cart.length)
    return (
      <EmptyCart
        title={t("Empty.title")}
        subTitle={t("Empty.subTitle")}
        button={t("Buttons.back")}
      />
    );

  const { totalDiscount, totalPrice, tax, couponActivated } = calculateCart({
    cart,
    couponData,
  });

  return (
    <section className="flex flex-col gap-3 w-full" data-id="cart-block">
      <h1 className="text-xl font-semibold mb-4">{t("title")}</h1>
      {cart?.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}
      <div>
        <div className=" flex flex-col lg:flex-row gap-5 pl-2">
          <Coupon couponActivated={couponActivated} totalPrice={totalPrice} />
          <CartSummary
            coupon={couponData?.code}
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
