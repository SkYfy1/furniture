import { cn, isVariant } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  data: Product | Variant;
  category?: string;
  name: string;
}

const Product: React.FC<Props> = ({ data, category, name }) => {
  const link = isVariant(data)
    ? `/shop/${category!.toLowerCase()}/${data.productId}?sku=${data.sku}`
    : `/shop/${data.category.toLowerCase()}/${data.id}`;

  const t = useTranslations("ShopPage");

  const notAvailable = data.availableQuantity === 0;

  let priceBlock: React.ReactNode;

  if (notAvailable) {
    priceBlock = (
      <span className="font-semibold text-sm text-gray-700 uppercase">
        {t("OutOfStock")}
      </span>
    );
  } else if (data.discount) {
    priceBlock = (
      <>
        <span className="font-semibold text-[10px] line-through text-sm">
          €{data.price}.00
        </span>
        <div className="flex gap-2 items-center font-semibold">
          <div className="text-green-800">€{data.discountedPrice}.00</div>
          <div className="text-xs bg-gray px-2 py-1 rounded-md">
            {data.discount}%
          </div>
        </div>
      </>
    );
  } else {
    priceBlock = (
      <span className="font-semibold text-sm">€{data.price}.00</span>
    );
  }

  return (
    <Link
      href={link}
      className="flex flex-col h-full pb-2 md:pb-10 min-h-[351]"
    >
      <div className="h-[260] w-[160] sm:w-[180] xl:h-[300] xl:w-[230] 2xl:size-[285] relative">
        {data.discount && !notAvailable && (
          <div className="absolute -translate-x-1/4 translate-y-1/4 top-0 right-0 size-10 flex justify-center items-center bg-green-900 z-10 rounded-full text-xs text-white">
            -{data.discount}%
          </div>
        )}
        <Image
          src={data.imageUrl}
          className={cn(
            "rounded-md object-cover 2xl:object-contain pointer-events-none bg-white",
            notAvailable && "grayscale"
          )}
          fill
          alt="product-image"
        />
      </div>
      <div className="px-1 py-0.5 mt-2">
        <p>{name}</p>
        {priceBlock}
      </div>
    </Link>
  );
};

export default Product;
