import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartitems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartitems = action.payload;
    },
    addToCart: (state, action) => {
      const existingBook = state.cartitems.find(
        (book) => book.cartId === action.payload
      );
      if (!existingBook) {
        state.cartitems.push(action.payload);
      }
      
    },
    removeFromCart: (state, action) => {
      state.cartitems = state.cartitems.filter(
        (book) => book.cartId !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartitems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setCart } =
  cartSlice.actions;

export default cartSlice.reducer;
