import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/getBaseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/books`,
  credentials: "include",
  // prepareHeaders: (Headers) => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     Headers.set("Authorization", `Bearer ${token}`);
  //   }
  //   return Headers;
  // },
});
const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery,
  tagTypes: ["Books", "Cart", "Users"],
  endpoints: (builder) => ({
    fetchAllBooks: builder.query({
      query: () => "/",
      providesTags: ["Books"],
    }),
    fetchBookById: builder.query({
      query: (bookId) => `/${bookId}`,
      credentials: "include",
      providesTags: (result, error, bookId) => [{ type: "Books", bookId }],
    }),
    createBook: builder.mutation({
      query: (newBook) => ({
        url: "/create-book",
        method: "POST",
        body: newBook,
        credentials: "include",
      }),
      transformResponse: (response) => {
        return response.data;
      },
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: (updatedBook) => {
        console.log(updatedBook instanceof FormData);
        const bookId =
          updatedBook instanceof FormData
            ? updatedBook.get("_id")
            : updatedBook._id;
        return {
          url: `/edit/${bookId}`,
          method: "PUT",
          body: updatedBook,
          credentials: "include",
        };
      },
      invalidatesTags: (result, error, updatedBook) => {
        const bookId =
          updatedBook instanceof FormData
            ? updatedBook.get("bookId")
            : updatedBook.bookId;
        return [{ type: "Books", bookId }];
      },
      transformResponse: (response) => {
        return response.data;
      },
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/delete/${bookId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Books"],
      transformResponse: (response) => {
        return response.data;
      },
    }),
    addToCartDb: builder.mutation({
      query: (bookId) => ({
        url: `/add-cart/${bookId}`,
        method: "POST",
        credentials: "include",
      }),
      transformResponse: (response) => {
        console.log(response.data);
        return response.data;
      },
      invalidatesTags: ["Cart", "Users"],
    }),
    removeFromCartDb: builder.mutation({
      query: (bookId) => ({
        url: `/remove-cart/${bookId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Cart", "Users"],
    }),
  }),
});

export const {
  useFetchAllBooksQuery,
  useFetchBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useAddToCartDbMutation,
  useRemoveFromCartDbMutation,
} = booksApi;

export default booksApi;
