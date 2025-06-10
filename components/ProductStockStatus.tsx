import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

const ProductStockStatus: React.FC<{ quantity: number }> = async ({
  quantity,
}) => {
  const t = await getTranslations("ProductPage.BuyBox");
  return (
    <div className="border-t py-4 flex justify-between items-center text-sm">
      <div className="flex gap-2 items-center">
        <Image
          src="/svg/stockIcon.svg"
          height={18}
          width={18}
          alt="stock-icon"
        />
        <p className="font-semibold">{t("productStatus")}</p>
        <div
          className={cn(
            "size-2.5 rounded-full bg-green-price",
            quantity < 20 && "bg-yellow-500",
            quantity === 0 && "bg-red-800"
          )}
        ></div>
      </div>
      <p>
        {quantity < 20 && quantity !== 0
          ? t("lessStock")
          : quantity >= 20
          ? t("inStock")
          : t("outStock")}
      </p>
    </div>
  );
};

export default ProductStockStatus;
