"use client";

import React, { useState } from "react";
import ProductMini from "./ProductMini";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/lib/hooks";
import { addItemsKit } from "@/lib/features/cartSlice";
import { useTranslations } from "next-intl";
import { Button } from "./ui/Button";

interface Props {
  title: string;
  description: string;
  products: Product[];
  selected?: string;
}

const StoriesOffer: React.FC<Props> = ({
  products,
  title,
  description,
  selected,
}) => {
  const dispatch = useAppDispatch();
  const [offerObjects, setOfferObjects] = useState<CartItem[]>(
    products.map((item) => ({
      id: item.id,
      name: item.name,
      newPrice: item.discountedPrice ?? item.price,
      oldPrice: item.price,
      discount: item.discount ?? 0,
      quantity: 1,
      image: item.imageUrl,
      available: item.availableQuantity,
    }))
  );
  const t = useTranslations("StoriesPage.PlantPage.Offer");

  const fullPrice = offerObjects.reduce((cur, acc) => {
    if (!acc.discount) return cur + acc.oldPrice * acc.quantity;
    return cur + acc.newPrice * acc.quantity;
  }, 0);

  const updateQuantity = (id: string, value: number) => {
    setOfferObjects((prev) =>
      prev.map((el) => (el.id === id ? { ...el, quantity: value } : el))
    );
  };

  return (
    <div className="px-6 w-full lg:w-5/12 relative">
      <h2 className="capitalize font-semibold text-3xl pb-2">{title}</h2>
      <p className="pb-3">{description}</p>
      <div className="sticky top-20">
        <section className="mt-2 border-y py-2">
          {products.map((product) => {
            const quantity = offerObjects.find(
              (el) => el.id === product.id
            )?.quantity;
            return (
              <ProductMini
                key={product.id}
                selected={selected}
                data={product}
                quantity={quantity!}
                changeQuantity={updateQuantity}
              />
            );
          })}
        </section>
        <div className="flex justify-between mt-5 pt-5 items-center">
          <div className="text-green-900">
            <span className="text-2xl font-semibold text-green-900">
              €{fullPrice}.00
            </span>
            <div className="text-[0.6rem] uppercase">*{t("tax")}</div>
          </div>
          <div className="flex flex-col lg:flex-row gap-1.5">
            <Button
              className={cn(
                "lg:text-base font-semibold hover:bg-gray-100 px-5 py-3 rounded-md bg-black text-white hover:text-black duration-150"
              )}
              onClick={() => dispatch(addItemsKit(offerObjects))}
            >
              {t("addToCart")}
            </Button>
            <Button
              className={cn(
                "lg:text-base font-semibold hover:bg-gray-100 px-5 py-3 rounded-md bg-black text-white hover:text-black duration-150"
              )}
            >
              {t("buyWithStripe")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoriesOffer;
