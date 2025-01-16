import React, { useEffect } from "react";
import { useGetAdminBooksQuery } from "../../redux/features/users/adminApi.js";
import { useDeleteBookMutation } from "../../redux/features/books/booksApi.js";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdminBooks,
  setAdminBooks,
} from "../../redux/features/dashboard/dashboardSlice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate()

  const [deleteBook] = useDeleteBookMutation();

  useEffect(() => {
    if (isSuccess && fetchedData?.data.length > 0) {
      if (adminBooks.length === 0 ) {
        dispatch(setAdminBooks(fetchedData.data));
      }
    }
  }, [fetchedData]);
  if (isLoading) return <p>Loading...</p>;
  console.log(fetchedData.data)
  console.log(adminBooks);

  const trendingBookCount = adminBooks.reduce((acc, book) =>
    book.trending ? acc + book.trending : acc + 0,
    0);
  
    const trendingpercentage = (trendingBookCount / adminBooks.length) * 100;


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
    <div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 justify-items-center mb-10">
        <div className="flex items-center w-[80vw] sm:w-[35vw] p-8 bg-white shadow rounded-lg max-w-[440px]">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">
              {adminBooks.length}
            </span>
            <span className="block text-gray-500">Products</span>
          </div>
        </div>

        <div className="flex items-center w-[80vw] sm:w-[35vw] p-8 bg-white shadow rounded-lg max-w-[440px]">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>
          </div>
          <div>
            <span className="inline-block text-2xl font-bold">
              {trendingBookCount}
            </span>
            <span className="inline-block text-xl text-gray-500 font-semibold">
              ({trendingpercentage.toFixed(2)}%)
            </span>
            <span className="block text-gray-500">
              Trending Books in This Month
            </span>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        {adminBooks.map((book) => (
          <div
            key={book._id}
            className="py-2 px-4 md:px-10 bg-white shadow rounded-lg flex items-center justify-between w-full"
          >
            <div className="flex items-center justify-between w-[65%]">
              {/* Book Cover */}
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-7 h-12 object-cover rounded"
              />

              {/* Book Title */}
              <h3 className="text-md font-medium text-center">{book.title}</h3>

              {/* Book Price */}
              <p className="text-sm text-gray-600">
                Price: <span className="font-medium">${book.newPrice}</span>
              </p>

              {/* Edit and Delete Buttons */}
            </div>
            <div className="w-[35%] flex items-center justify-center gap-6 sm:gap-10 md:gap-16">
              <button
                onClick={() => navigate(`edit-book/${book._id}`)}
                className="text-blue-500 text-sm hover:text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book._id)}
                className="text-red-500 text-sm hover:text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
