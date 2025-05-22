import { paymentInfo, Products, shippingInfo, Variants } from "@/db/tableTypes";
import React from "react";
import OrderItem from "./OrderItem";
import OrderShipping from "./OrderShipping";
import OrderPayment from "./OrderPayment";

interface Props {
  items: Variants[] | Products[];
  shipping: shippingInfo;
  payment: paymentInfo;
  orderId: string;
  retryAction: () => Promise<void>;
}

const OrderDetails: React.FC<Props> = ({
  items,
  shipping,
  payment,
  orderId,
  retryAction,
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-1.5 py-2">
        <h1 className="text-lg font-semibold">Order Items</h1>
        {items.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </div>
      <OrderShipping shipping={shipping} />
      <OrderPayment
        retryAction={retryAction}
        orderId={orderId}
        payment={payment}
      />
    </div>
  );
};

export default OrderDetails;
