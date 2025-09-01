"use client";

import React, { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/store";
import { Persistor, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const storeRef = useRef<AppStore>(undefined);
  const persistRef = useRef<Persistor>(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    persistRef.current = persistStore(storeRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistRef.current!}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
