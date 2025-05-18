import { OrdersValue } from "@/lib/data/order";
import React from "react";

interface Props {
  order: OrdersValue;
}

const Order: React.FC<Props> = ({ order }) => {
  const orderInfo = order.order;
  // const products = order.items;
  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-base font-semibold pb-1">
            Order ID <span className="text-xs">#{orderInfo.id}</span>.{" "}
            <span className="text-green-price">{orderInfo.orderStatus}</span>
          </h3>
          <div className="flex gap-2 text-xs">
            <p className="after:content-['|'] after:pl-2">
              Placed on {orderInfo.orderDate?.toDateString()}
            </p>
            <p>
              Will be sent{" "}
              <span className="text-blue-600 uppercase">tomorrow</span>
            </p>
          </div>
        </div>
        <div className="text-green-price font-semibold text-lg text-center flex flex-col gap-1">
          <div>€{orderInfo.summaryPrice}.00</div>
          <button className="text-gray-500 hover:text-black duration-300 rounded-md text-[0.55rem] cursor-pointer">
            Show details ↓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
