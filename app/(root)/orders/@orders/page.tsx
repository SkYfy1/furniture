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
import { getMessages, getTranslations } from "next-intl/server";
import { Messages } from "next-intl";

export const generateMetadata = async (): Promise<Metadata> => {
  const t: Messages = await getMessages();

  const title = t.TabTitles.Orders;

  return {
    title: title,
    description: "Track or manage your orders with ease!",
    robots: {
      index: false,
      follow: false,
    },
  };
};

const Page = async () => {
  const session = await auth();

  const id = session?.user?.id as string;

  const orders = await getOrderData(id);
  const t = await getTranslations("OrdersPage.Orders.empty");

  if (!orders.length) {
    return (
      <div className="flex items-center pt-36 flex-col gap-4 text-black">
        <h1 className="text-5xl font-semibold">{t("title")}</h1>
        <Link href="/shop" className="underline text-sm">
          {t("link")}
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
