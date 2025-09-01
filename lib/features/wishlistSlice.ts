import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  list: string[];
}

const initialState: InitialState = {
  list: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<string>) => {
      const has = state.list.find((el) => el === action.payload);

      if (has) return;

      state.list.push(action.payload);
    },
    deleteFromWishlist: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((el) => el !== action.payload);
    },
  },
});

export const { addToWishlist, deleteFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
