import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getBaseUrl } from "../../../utils/getBaseUrl";

const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/admin`,
    credentials: "include",
  }),
  tagTypes: ["Admin","Books"],
  endpoints: (builder) => ({
    registerAdmin: builder.mutation({
      query: (newAdmin) => ({
        url: "register",
        method: "POST",
        body: JSON.stringify(newAdmin),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response, meta, arg) => {
        return response;
      },
      invalidatesTags: ["Admin","Books"],
    }),
    loginAdmin: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response, meta, arg) => {
        // ...
        return response;
      },
      invalidatesTags: ["Admin","Books"],
    }),

    getAdminBooksAndUsers: builder.query({
      query: () => ({
        url: "/book-users",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Books"],
    }),
    getAdminBooks:builder.query({
      query: () => ({
        url: "/books",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Books"],
    }),
    getAdmin:builder.query({
      query: () => ({
        url: "/",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Admin"],
    }),
    lgoutAdmin:builder.mutation({
      query:()=>({
        url:"logout",
        method:"POST",
        credentials:"include",
        transformResponse:(response,meta,arg)=>{
          return response.data;
        },
        invalidatesTags:["Admin"]
      })
    }),
  }),
});

export const {
  useRegisterAdminMutation,
  useLoginAdminMutation,
  useGetAdminBooksAndUsersQuery,
  useGetAdminBooksQuery,
  useGetAdminQuery,
  useLgoutAdminMutation
} = adminApi;
export default adminApi;
