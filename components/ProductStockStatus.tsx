import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const ProductStockStatus: React.FC<{ quantity: number }> = ({ quantity }) => {
  return (
    <div className="border-t py-4 flex justify-between items-center text-sm">
      <div className="flex gap-2 items-center">
        <Image
          src="/svg/stockIcon.svg"
          height={18}
          width={18}
          alt="stock-icon"
        />
        <p className="font-semibold">Online</p>
        <div
          className={cn(
            "size-2.5 rounded-full bg-green-price",
            quantity < 20 && "bg-yellow-500"
          )}
        ></div>
      </div>
      <p>{quantity < 20 ? "Less than 20" : "20+"} in stock</p>
    </div>
  );
};

export default ProductStockStatus;
