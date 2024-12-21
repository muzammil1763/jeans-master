// utils/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store"; // Adjust the path if necessary

interface CartItem {
  _id: string;
  price: number; // Change this line
  quantity: number;
  colorName: string;
  colorImage:string; // Selected color name
  fabricName: string; // Selected fabric name
  frontPocketName: string; // Selected front pocket image name
  backPocketName: string; // Selected back pocket image name
  waist: number; // Waist measurement
  length: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state: CartState, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearCart: (state: CartState) => {
      state.items = [];
    },
  },
});

// Selector to calculate the total price
export const selectTotalPrice = (state: RootState): number =>
  state.cart.items.reduce<number>((total, item) => total + item.price, 0);

export const selectCartQuantity = (state: RootState): number => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
