import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/getBaseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/books`,
  Credential: "include",
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set("Authorization", `Bearer ${token}`);
    }
    return Headers;
  },
});
const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery,
  tagTypes: ["Books","Cart","Users"],
  endpoints: (builder) => ({
    fetchAllBooks: builder.query({
      query: () => "/",
      providesTags: ["Books"],
    }),
    fetchBookById: builder.query({
      query: (bookId) => `/${bookId}`,
      providesTags: (result, error, bookId) => [{ type: "Books", bookId }],
    }),
    createBook: builder.mutation({
      query: (newBook) => ({
        url: "/create-book",
        method: "POST",
        body: JSON.stringify(newBook),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: (updatedBook) => ({
        url: `/edit/${updatedBook._id}`,
        method: "PUT",
        body: JSON.stringify(updatedBook),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (result, error, updatedBook) => [
        { type: "Books", bookId: updatedBook._id },
      ],
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/delete/${bookId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Books"],
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
      invalidatesTags: ["Cart","Users"],
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
  useRemoveFromCartDbMutation
} = booksApi;

export default booksApi;
