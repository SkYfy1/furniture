import { paymentInfo, Products, shippingInfo, Variants } from "@/db/tableTypes";
import React from "react";
import OrderItem from "./OrderItem";
import OrderShipping from "./OrderShipping";
import OrderPayment from "./OrderPayment";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

interface OrderDetails {
  items: Variants[] | Products[];
  shipping: shippingInfo;
  payment: paymentInfo;
  orderId: string;
  orderStatus: "CANCELLED" | "FULFILLED" | "CREATED" | "PROCESSING" | null;
  retryAction: () => Promise<void>;
}

interface Props {
  details: OrderDetails;
}

const OrderDetails: React.FC<Props> = ({
  details: { items, shipping, payment, orderId, retryAction, orderStatus },
}) => {
  const t = useTranslations("OrdersPage.Orders.Order.OrderDetails");
  return (
    <motion.div
      exit={{
        opacity: 0,
        height: 0,
      }}
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: 1,
        height: "auto",
      }}
      style={{ overflow: "hidden" }}
      className="flex flex-col lg:flex-row  justify-between"
    >
      <div className="flex flex-col gap-1.5 py-2">
        <h1 className="text-lg font-semibold">{t("Items.title")}</h1>
        {items.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </div>
      <OrderShipping shipping={shipping} />
      {orderStatus !== "CANCELLED" && (
        <OrderPayment
          retryAction={retryAction}
          orderId={orderId}
          payment={payment}
        />
      )}
    </motion.div>
  );
};

export default OrderDetails;
