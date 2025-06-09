"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { clearCart } from "@/lib/features/cartSlice";

const ClearCart = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearCart());
    window.localStorage.setItem("cart", "[]");
  }, [dispatch]);
  return null;
};

export default ClearCart;
