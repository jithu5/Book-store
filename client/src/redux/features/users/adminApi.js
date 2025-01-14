import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getBaseUrl } from "../../../utils/getBaseUrl";

const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/admin`,
    credentials: "include",
  }),
  tagTypes: ["Admin"],
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
        return response.data;
      },
      invalidatesTags: ["Admin"],
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
        return response.data;
      },
      invalidatesTags: ["Admin"],
    }),

    getAdmin: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Admin"],
    }),
  }),
});

export const {
  useRegisterAdminMutation,
  useLoginAdminMutation,
  useGetAdminQuery,
} = adminApi;
export default adminApi;
