"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { clearCart } from "@/lib/features/cartSlice";

const ClearCart = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);
  return null;
};

export default ClearCart;
