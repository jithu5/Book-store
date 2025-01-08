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
      console.log("Payload received:", action.payload);
      console.log("Cart item:", state.cartitems)
      const existingBook = state.cartitems.find(
        (book) => book.bookId === action.payload._id || book._id === action.payload._id
      );
      console.log(existingBook)
      if (!existingBook) {
        state.cartitems.push(action.payload);
      }else{
        console.log("Book already added:", existingBook);
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
