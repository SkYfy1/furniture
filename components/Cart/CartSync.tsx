"use client";

import { useAppSelector } from "@/lib/hooks";
import React, { useEffect } from "react";

const CartSync: React.FC = () => {
  const cart = useAppSelector((state) => state.cart.items);
  const isInitialized = useAppSelector((state) => state.cart.isInitialized);

  useEffect(() => {
    const updateStorage = () => {
      const cartItems = JSON.stringify(cart);
      window.localStorage.setItem("cart", cartItems);
    };

    if (isInitialized) updateStorage();
  }, [cart, isInitialized]);
  return null;
};

export default CartSync;
