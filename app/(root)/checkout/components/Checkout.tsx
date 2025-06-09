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
  email: string;
  shippingData?: shippingInfo;
  action: CreateOrder;
}

const Checkout: React.FC<Props> = ({ email, action, shippingData }) => {
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

  const defaultValues = {
    firstName: shippingData?.firstName ?? "",
    lastName: shippingData?.lastName ?? "",
    country: shippingData?.country ?? "",
    city: shippingData?.city ?? "",
    state: shippingData?.state ?? "",
    zip: shippingData?.zip.toString() ?? "",
    address: shippingData?.address ?? "",
    default: false,
    shippingService: shippingData?.shippingService ?? ("MEEST" as const),
    paymentMethod: "CARD" as const,
  };

  // If cart is empty - redirect to main page!

  useEffect(() => {
    if (cart.length === 0) router.push("/");
  }, [cart, router]);

  return (
    <section className="flex flex-col md:flex-row md:gap-24 gap-8">
      <OrderForm
        cartItems={cartItems}
        defaultValues={defaultValues}
        email={email}
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
