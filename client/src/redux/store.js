import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice.js";
import  booksApi  from "./features/books/booksApi.js"; // Ensure correct import
import userApi from "./features/users/usersApi.js";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [userApi.reducerPath] : userApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware,userApi.middleware), // Add return to fix issue
});

export default store;
