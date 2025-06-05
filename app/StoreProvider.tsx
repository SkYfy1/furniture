"use client";

import React, { ReactNode, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/store";
import { initializeCart } from "@/lib/features/cartSlice";

const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const jsonCart = window.localStorage.getItem("cart");
    const cart = JSON.parse(jsonCart || "[]");
    storeRef.current?.dispatch(initializeCart(cart));
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
