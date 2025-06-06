"use client";

import React, { useEffect } from "react";
import OrderForm from "./OrderForm";
import OrderSummary from "./OrderSummary";
import { CreateOrder } from "@/lib/actions/order";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { shippingInfo } from "@/db/tableTypes";
import { calculateCart } from "@/lib/utils";

interface Props {
  userId: string;
  shippingData?: shippingInfo;
  action: CreateOrder;
}

const Checkout: React.FC<Props> = ({ userId, action, shippingData }) => {
  const cart = useAppSelector((state) => state.cart.items);
  const couponData = useAppSelector((state) => state.cart.coupon);
  const router = useRouter();

  const { totalDiscount, totalPrice, tax } = calculateCart({
    cart,
    couponData,
  });

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
    <section className="flex flex-col md:flex-row md:gap-24 gap-8">
      <OrderForm
        cartItems={cartItems}
        defaultValues={
          shippingData !== undefined
            ? {
                ...shippingData,
                // zip number (in db) - z object waits string
                zip: shippingData.zip.toString(),
                paymentMethod: "CARD",
                default: false,
              }
            : undefined
        }
        userId={userId}
        action={action}
        summaryPrice={totalPrice + tax}
      />
      <OrderSummary
        coupon={couponData}
        cart={cart}
        totalDiscount={totalDiscount}
        totalPrice={totalPrice}
        tax={tax}
      />
    </section>
  );
};

export default Checkout;
