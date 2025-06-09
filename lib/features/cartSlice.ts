import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: CartItem[];
  coupon?: Coupon;
  isInitialized: boolean;
}

const initialState: CartState = {
  items: [],
  coupon: undefined,
  isInitialized: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const exists = state.items.find((el) => el.id === action.payload.id);
      if (exists) {
        if (exists.quantity === exists.available) {
          return;
        }
        exists.quantity += 1;
        return;
      }

      state.items.push(action.payload);
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      //   state.items = state.items.map((item) =>
      //     item.id === action.payload
      //       ? { ...item, quantity: item.quantity + 1 }
      //       : item
      //   );
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity < item.available) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity -= 1;
      }
    },
    addItemsKit: (state, action: PayloadAction<CartItem[]>) => {
      action.payload.forEach((item) => {
        const exists = state.items.find((el) => el.id === item.id);
        if (exists) {
          exists.quantity += item.quantity;
          return;
        }
        state.items.push(item);
      });

      // Immutable

      // const ids = action.payload.map((el) => el.id);

      // const updated = state.items.map((item) => {
      //   if (ids.includes(item.id)) {
      //     const elem = action.payload.find((el) => el.id === item.id);
      //     return { ...item, quantity: item.quantity + elem!.quantity };
      //   }
      //   return item;
      // });

      // const stateIds = state.items.map((el) => el.id);

      // const notIn = action.payload.filter(
      //   (item) => !stateIds.includes(item.id)
      // );
      // state.items = [...updated, ...notIn];
    },
    clearCart: (state) => {
      state.items = [];
    },
    initializeCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.isInitialized = true;
    },
    addCoupon: (state, action: PayloadAction<Coupon>) => {
      state.coupon = action.payload;
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
  addItemsKit,
  clearCart,
  initializeCart,
  addCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
