"use client";

import { useAppDispatch } from "@/lib/hooks";
import React from "react";
import { addItem } from "@/lib/features/cartSlice";
import { Button } from "./ui/Button";

interface Props {
  payload: CartItem;
}

const BuyButtons: React.FC<Props> = ({ payload }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col lg:flex-row gap-1.5 mb-3">
      <Button
        size="lg"
        className="w-full"
        onClick={() => {
          dispatch(addItem(payload));
        }}
      >
        Add to cart
      </Button>
      <Button className="w-full" size="lg">
        But with Stripe
      </Button>
    </div>
  );
};

export default BuyButtons;
