"use client";

import { useAppDispatch } from "@/lib/hooks";
import React from "react";
import { addItem } from "@/lib/features/cartSlice";
import { Button } from "./ui/Button";
import { buyNow } from "@/lib/actions/payment";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";

interface Props {
  disabled: boolean;
  payload: CartItem;
  userId: string;
  type: "variant" | "product";
}

const BuyButtons: React.FC<Props> = ({ payload, type, userId, disabled }) => {
  const dispatch = useAppDispatch();
  const t = useTranslations("ProductPage.BuyBox");
  const handleStripeBuy = async () => {
    const result = await buyNow({
      id: payload.id,
      quantity: payload.quantity,
      name: payload.name,
      imageUrl: payload.image,
      price: payload.newPrice,
      type,
      userId,
    });

    if (result.success) {
      redirect(result.url as string);
    } else {
      console.log(result.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-1.5 mb-3">
      <Button
        disabled={disabled}
        size="lg"
        className="w-full"
        onClick={() => {
          dispatch(addItem(payload));
        }}
      >
        {t("addButton")}
      </Button>
      <Button
        disabled={disabled}
        className="w-full"
        size="lg"
        onClick={handleStripeBuy}
      >
        {t("stripeButton")}
      </Button>
    </div>
  );
};

export default BuyButtons;
