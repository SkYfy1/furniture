import TooltipComponent from "@/components/TooltipComponent";
import { shippingInfo } from "@/db/tableTypes";
import { updateDefaultDelivery } from "@/lib/actions/order";
import { useTranslations } from "next-intl";
import React from "react";

const OrderShipping: React.FC<{ shipping: shippingInfo }> = ({ shipping }) => {
  const t = useTranslations("OrdersPage.Orders.Order.OrderDetails.Delivery");
  return (
    <div className="py-2">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold">{t("title")}</h1>
        <TooltipComponent
          text={t("Tooltip.data")}
          handler={updateDefaultDelivery.bind(null, shipping.id)}
        >
          {t("Tooltip.label")}
        </TooltipComponent>
      </div>
      {shipping.default && (
        <p className="text-sm text-green-700 font-semibold tracking-wide">
          {t("status")}
        </p>
      )}
      <div className="flex-col flex gap-1 pt-4 text-sm">
        <p>
          {t("info.service")}: {shipping.shippingService}
        </p>
        <p>
          {t("info.fullname")}: {shipping.firstName} {shipping.lastName}
        </p>
        <p>
          {t("info.country")}: {shipping.country}
        </p>
        <p>
          {t("info.city")}: {shipping.city}
        </p>
        <p>
          {t("info.state")}: {shipping.state}
        </p>
        <p>
          {t("info.zipCode")}: {shipping.zip}
        </p>
        <p>
          {t("info.address")}: {shipping.address}
        </p>
        <p>
          {t("info.status")}: {shipping.deliveryStatus}
        </p>
      </div>
    </div>
  );
};

export default OrderShipping;
