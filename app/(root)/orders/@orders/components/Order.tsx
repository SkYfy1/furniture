"use client";

import { OrdersValue, paymentInfo, shippingInfo } from "@/db/tableTypes";
import React, { use, useState } from "react";
import OrderDetails from "./OrderDetails";
import { cn, formatDate } from "@/lib/utils";
import { retryPayment } from "@/lib/actions/payment";
import { redirect } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";

interface Props {
  order: OrdersValue;
  getOrderDelivery: Promise<shippingInfo>;
  getOrderPayment: Promise<paymentInfo>;
}

const Order: React.FC<Props> = ({
  order,
  getOrderDelivery,
  getOrderPayment,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const t = useTranslations("OrdersPage.Orders.Order");

  const shippingInfo = use(getOrderDelivery);
  const paymentInfo = use(getOrderPayment);

  const orderInfo = order.order;
  const products = order.items;
  const cancelled = paymentInfo.paymentStatus === "CANCELLED";

  const orderStatus = orderInfo.orderStatus;

  const statusText = {
    FULFILLED:
      shippingInfo?.arrivalDate &&
      formatDate(shippingInfo.arrivalDate.toDateString()),
    CREATED: t("orderStatus.pending"),
    CANCELLED: t("orderStatus.cancel"),
    PROCESSING: t("orderStatus.sent"),
  };

  const retryAction = async () => {
    const url = await retryPayment({
      userId: orderInfo.clientId,
      paymentId: paymentInfo.id,
      orderedProducts: products,
    });

    if (url) redirect(url);
  };
  return (
    <div className="border rounded-md p-4 bg-gray">
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <div>
          <h3 className="text-base font-semibold pb-1">
            {t("title")} <span className="text-xs">#{orderInfo.id}</span>{" "}
            <span
              className={cn("text-green-price", cancelled && "text-red-900")}
            >
              {orderInfo.orderStatus}
            </span>
          </h3>
          <div className="flex flex-row gap-2 text-[0.63rem] md:text-xs">
            <p className="sm:after:content-['|'] sm:after:pl-2">
              {t("placed")}{" "}
              <span className="font-semibold">
                {formatDate(orderInfo.orderDate?.toDateString())}
              </span>
            </p>
            <p className="font-semibold text-blue-600">
              {statusText[orderStatus ?? "CREATED"]}
            </p>
          </div>
        </div>
        <div className="text-green-price font-semibold text-lg text-center flex md:flex-col w-full md:w-fit justify-between md:gap-1 pt-2 md:pt-0">
          <div>€{orderInfo.summaryPrice}.00</div>
          <button
            onClick={() => setShowDetails((prev) => !prev)}
            className="text-gray-500 hover:text-black duration-300 rounded-md text-[0.55rem] cursor-pointer"
          >
            {t("button")}{" "}
            <span
              className={cn(
                "inline-block duration-200",
                showDetails && "rotate-180"
              )}
            >
              ↓
            </span>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {showDetails && (
          <OrderDetails
            details={{
              items: products,
              orderStatus,
              shipping: shippingInfo,
              payment: paymentInfo,
              orderId: orderInfo.id,
              retryAction,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Order;
