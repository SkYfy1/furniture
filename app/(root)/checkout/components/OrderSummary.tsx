"use client";

import CartItem from "@/components/Cart/CartItem";
import CartSummary from "@/components/Cart/CartSummary";
import { useTranslations } from "next-intl";
import React from "react";

interface Props {
  cart: CartItem[];
  totalPrice: number;
  totalDiscount: number;
  tax: number;
  coupon?: Coupon;
}

const OrderSummary: React.FC<Props> = ({
  cart,
  coupon,
  totalDiscount,
  totalPrice,
  tax,
}) => {
  const t = useTranslations("CheckoutPage");
  return (
    <div className="p-5 border flex-1 rounded-md mt-3">
      <h2 className="font-semibold text-lg">{t("OrderSummary")}</h2>
      <div className="flex-col flex gap-2 pt-4 min-h-[95%] justify-between">
        {cart?.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
        <CartSummary
          coupon={coupon?.code}
          summary={totalPrice}
          discount={totalDiscount}
          tax={tax}
        />
      </div>
    </div>
  );
};

export default OrderSummary;
