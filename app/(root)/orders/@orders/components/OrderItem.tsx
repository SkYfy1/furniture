import { Products, Variants } from "@/db/tableTypes";
import { isProductTable } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

interface Props {
  item: Variants | Products;
}

const OrderItem: React.FC<Props> = ({ item }) => {
  const t = useTranslations("OrdersPage.Orders.Order.OrderDetails.Items");
  return (
    <div className="flex gap-4 rounded-md group">
      <div className="relative h-[130] w-[100] border bg-white rounded-md group-hover:border-black duration-150">
        <Image
          src={item.imageUrl as string}
          fill
          className="object-contain"
          alt="product-image"
        />
      </div>
      <div className="capitalize text-sm py-2 flex flex-col gap-1">
        {isProductTable(item) ? (
          <>
            <p>{item.name}</p>
            <p>{t("colorSize")}: default</p>
          </>
        ) : (
          <>
            <p>{item?.sku?.split("-").join(" ")}</p>
            <p>
              {t("colorSize")}: {item.color ?? item.size}
            </p>
          </>
        )}
        <p>
          {t("price")}:{" "}
          <span className="text-xs font-semibold">€{item.price}.00</span>
        </p>
        <p>
          {t("quantity")}: {item.quantity}
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
