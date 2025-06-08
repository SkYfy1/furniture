import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface Props {
  data: Product;
  quantity: number;
  selected?: string;
  changeQuantity: (id: string, value: number) => void;
}

const ProductMini: React.FC<Props> = ({
  data,
  selected,
  quantity,
  changeQuantity,
}) => {
  return (
    <div
      className={cn(
        "flex gap-4 h-full min-h-fit justify-between min-w-fit lg:min-w-0 py-3 px-2 mt-0 last:border-b-transparent",
        selected === data.id
          ? "border-black border rounded-md last:border-b-gray-500"
          : "border border-b border-b-gray-200 border-x-transparent border-t-transparent"
      )}
    >
      <div className="h-[100] w-[80] lg:h-[180] lg:w-[150] relative">
        <Image
          src={data.imageUrl}
          className="rounded-md object-contain"
          fill
          alt="product-image"
        />
      </div>
      <div className="px-1 py-0.5 mt-2 text-sm flex-1">
        <p className="mb-1">{data.name}</p>
        {data.discount ? (
          <>
            <span className="font-semibold text-[10px] line-through text-sm">
              €{data.price}.00
            </span>
            <div className="flex gap-2 items-center font-semibold">
              <div className="text-green-800">€{data.discountedPrice}.00</div>
              <div className="text-xs bg-gray px-2 py-1 rounder-md">
                {data.discount}%
              </div>
            </div>
          </>
        ) : (
          <span className="font-semibold text-sm">€{data.price}.00</span>
        )}
      </div>
      <div className="flex flex-col">
        <button
          className="py-1 px-3 cursor-pointer hover:bg-gray"
          onClick={() => changeQuantity(data.id, quantity + 1)}
        >
          +
        </button>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "") return changeQuantity(data.id, 1);
            changeQuantity(data.id, parseInt(e.target.value));
          }}
          value={quantity}
          type="number"
          className="text-center text-sm py-2 hover:bg-gray"
          max={10}
          min={1}
        />
        <button
          className="py-1 px-3 cursor-pointer hover:bg-gray"
          onClick={() => {
            if (quantity === 1) return;
            changeQuantity(data.id, quantity - 1);
          }}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default ProductMini;
