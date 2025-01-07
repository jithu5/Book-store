import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cartitems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart:(state,action)=>{
      state.cartitems = action.payload;
    },
    addToCart: (state, action) => {
      const existingBook = state.cartitems.find(
        (book) => book._id === action.payload._id
      );
      if (!existingBook) {
        state.cartitems.push(action.payload);
        Swal.fire({
          title: "Book added to cart!",
          icon: "success",
          confirmButtonText: "Continue Shopping",
          confirmButtonColor: "#FFCE1A",
          color: "#0D0842",
          position:"top-right"
        });
      } else {
        Swal.fire({
          title: "Book already in cart!",
          icon: "info",
          confirmButtonText: "View Cart",
          confirmButtonColor: "#FFCE1A",
          showCancelButton: true,
          cancelButtonColor: "#DC143C",
          position:"top-right"
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cartitems = state.cartitems.filter(
        (book) => book._id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartitems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;
