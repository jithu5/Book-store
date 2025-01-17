import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/getBaseUrl";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/users`,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Users", "Cart"], // More descriptive tags
  endpoints: (builder) => ({
    registerUserinDB: builder.mutation({
      query: (newUser) => ({
        url: "register",
        method: "POST",
        body: newUser,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Users","Cart"],
    }),
    loginUserDb: builder.mutation({
      query: (user) => ({
        url: "login",
        method: "POST",
        body: user,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Users","Cart"],
    }),
    logoutUserDb: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Users"],
    }),
    addToCartDb: builder.mutation({
      query: (bookId) => ({
        url: `/add-cart/${bookId}`,
        method: "POST",
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Cart"], // Ensure cart queries are refetched
    }),
    getCartBooksDb: builder.query({
      query: () => ({
        url: "/cart",
      }),
      providesTags: ["Cart"], // Cache invalidation for cart
    }),
  }),
});

export const {
  useRegisterUserinDBMutation,
  useAddToCartDbMutation,
  useLoginUserDbMutation,
  useGetCartBooksDbQuery,
  useLogoutUserDbMutation,
} = userApi;

export default userApi;
