import React from "react";
import BuyButtons from "./BuyButtons";
import { cn } from "@/lib/utils";
import VariantButton from "./VariantButton";
import ProductStockStatus from "./ProductStockStatus";
import ProductTags from "./ProductTags";

interface Props {
  product: Product;
  selected: Variant;
  variants: Variant[];
  userId: string;
}

const BuyBox: React.FC<Props> = ({ product, variants, selected, userId }) => {
  const source = selected ?? product;
  const payload = {
    id: source.id,
    name: product.name,
    newPrice: source.discountedPrice ?? source.price,
    oldPrice: source.price,
    discount: source.discount ?? 0,
    quantity: 1,
    image: source.imageUrl,
  };
  return (
    <section className="lg:w-2/3">
      <div className="sticky top-22 flex flex-col gap-4">
        <ProductTags tags={product.tags} />
        <div className={cn(product.tags?.length === 0 && "mt-4 md:mt-0")}>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <h2 className="text-sm">{product.description}</h2>
        </div>
        {variants.length > 1 && (
          <div className="flex gap-2 pb-2 border-b-3">
            {variants?.map((variant) => (
              <VariantButton
                key={variant.id}
                url={variant.imageUrl}
                sku={variant.sku}
                size={variant.size}
                color={variant.color}
              />
            ))}
          </div>
        )}
        <div>
          {product.discount ? (
            <>
              <span className="font-semibold text-[12px] line-through text-sm">
                €{selected ? selected.price : product.price}.00
              </span>
              <div className="flex gap-2 items-center font-semibold">
                <div className="text-green-price text-2xl">
                  €
                  {selected
                    ? selected.discountedPrice
                    : product.discountedPrice}
                  .00
                </div>
                <div className="text-sm bg-gray px-2 py-1 rounder-md">
                  {selected ? selected.discount : product.discount}%
                </div>
              </div>
            </>
          ) : (
            <span className="font-semibold text-sm">
              €{selected ? selected.price : product.price}.00
            </span>
          )}
        </div>
        <BuyButtons
          payload={payload}
          userId={userId}
          type={selected ? "variant" : "product"}
        />
        <ProductStockStatus
          quantity={selected?.availableQuantity ?? product.availableQuantity}
        />
      </div>
    </section>
  );
};

export default BuyBox;
