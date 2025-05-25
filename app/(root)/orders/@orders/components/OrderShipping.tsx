import TooltipComponent from "@/components/TooltipComponent";
import { shippingInfo } from "@/db/tableTypes";
import { updateDefaultDelivery } from "@/lib/actions/order";
import React from "react";

const OrderShipping: React.FC<{ shipping: shippingInfo }> = ({ shipping }) => {
  return (
    <div className="py-2">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold">Delivery Info</h1>
        <TooltipComponent
          text="Set as default delivery method"
          handler={updateDefaultDelivery.bind(null, shipping.id)}
        >
          Select
        </TooltipComponent>
        {/* <Button size="sm">Set as default delivery method</Button> */}
      </div>
      {shipping.default && <p className="text-sm text-green-700">Default</p>}
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
