import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice.js";
import  booksApi  from "./features/books/booksApi.js"; // Ensure correct import
import userApi from "./features/users/usersApi.js";
import adminApi from "./features/users/adminApi.js";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [userApi.reducerPath] : userApi.reducer,
    [adminApi.reducerPath] : adminApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware,userApi.middleware,adminApi.middleware), // Add return to fix issue
});

export default store;
