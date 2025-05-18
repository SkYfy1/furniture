import { shippingInfo } from "@/db/tableTypes";
import React from "react";

const OrderShipping: React.FC<{ shipping: shippingInfo }> = ({ shipping }) => {
  return (
    <div className="py-2">
      <h1 className="text-lg font-semibold">Delivery Info</h1>
      <div className="flex-col flex gap-1 pt-4 text-sm">
        <p>Service: {shipping.shippingService}</p>
        <p>
          Fullname: {shipping.firstName} {shipping.lastName}
        </p>
        <p>Country: {shipping.country}</p>
        <p>City: {shipping.city}</p>
        <p>State: {shipping.state}</p>
        <p>Zip code: {shipping.zip}</p>
        <p>Address: {shipping.address}</p>
        <p>Status: {shipping.deliveryStatus}</p>
      </div>
    </div>
  );
};

export default OrderShipping;
