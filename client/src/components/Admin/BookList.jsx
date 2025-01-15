import React, { useEffect } from "react";
import { useGetAdminBooksQuery } from "../../redux/features/users/adminApi.js";
import { useDeleteBookMutation } from "../../redux/features/books/booksApi.js";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdminBooks,
  setAdminBooks,
} from "../../redux/features/dashboard/dashboardSlice.js";
import { toast } from "react-toastify";

const BookList = () => {
  const adminBooks = useSelector((state) => state.adminBook.adminBooks) || [];

  const {
    data: fetchedData,
    isLoading,
    isSuccess,
  } = useGetAdminBooksQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  const dispatch = useDispatch();

  const [deleteBook] = useDeleteBookMutation();

  useEffect(() => {
    if (isSuccess && fetchedData?.data.length > 0) {
      if (adminBooks.length !== fetchedData.data.length) {
        dispatch(setAdminBooks(fetchedData.data));
      }
    }
  }, [fetchedData]);
  console.log(adminBooks);

  if (isLoading) return <p>Loading...</p>;

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      dispatch(deleteAdminBooks(id));
      toast.success("Delete Book successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full flex flex-col gap-2">
      {adminBooks.map((book) => (
        <div
          key={book._id}
          className="py-2 px-4 bg-white shadow rounded-lg flex items-center justify-between"
        >
          {/* Book Cover */}
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-9 object-cover rounded"
          />

          {/* Book Title */}
          <h3 className="text-md font-medium text-center">{book.title}</h3>

          {/* Book Price */}
          <p className="text-sm text-gray-600">
            Price: <span className="font-medium">${book.newPrice}</span>
          </p>

          {/* Edit and Delete Buttons */}

          <button className="text-blue-500 text-sm hover:text-blue-600">
            Edit
          </button>
          <button
            onClick={() => handleDelete(book._id)}
            className="text-red-500 text-sm hover:text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
