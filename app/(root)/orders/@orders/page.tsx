import { auth } from "@/auth";
import {
  getOrderData,
  getPaymentInfo,
  getShippingInfo,
} from "@/lib/data/order";
import React from "react";
import Order from "./components/Order";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
  description: "Track or manage your orders with ease",
  robots: {
    index: false,
    follow: false,
  },
};

const Page = async () => {
  const session = await auth();

  const id = session?.user?.id as string;

  const orders = await getOrderData(id);

  if (!orders.length) {
    return (
      <div className="flex items-center pt-36 flex-col gap-4 text-black">
        <h1 className="text-5xl font-semibold">No Orders Placed Yet</h1>
        <Link href="/shop" className="underline text-sm">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 mt-8 flex flex-col gap-3 bg-white rounded-md">
      {orders.map((order) => (
        <Order
          key={order.order.id}
          order={order}
          getOrderDelivery={getShippingInfo(order.order.shippingInfo)}
          getOrderPayment={getPaymentInfo(order.order.paymentInfo)}
        />
      ))}
    </div>
  );
};

export default Page;
