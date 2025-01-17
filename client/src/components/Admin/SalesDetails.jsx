import React, { useEffect, useState } from "react";

import { MdOutlineIncompleteCircle } from "react-icons/md";
import { useGetAdminBooksAndUsersQuery } from "../../redux/features/users/adminApi";

function SalesDetails() {
  const [totalSales, setTotalSales] = useState(0);
  const [openBook, setOpenBook] = useState(null); // Track which book's dropdown is open

  const { data: fetchData, isLoading } = useGetAdminBooksAndUsersQuery();

  const books = fetchData?.data;

  useEffect(() => {
    console.log(books);
    console.log(isLoading);
    if (books && !isLoading) {
      console.log(books);
      const sales = books.reduce((acc, item) => acc + item.users.length, 0);
      console.log(sales);
      setTotalSales(sales);
    }
  }, [books, isLoading]);

  if (isLoading) {
    return (
      <div className="py-12 px-4 text-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  const toggleDropdown = (bookId) => {
    setOpenBook(openBook === bookId ? null : bookId); // Toggle open/close for the book
  };

  return (
    <>
      <section className="w-full flex flex-col">
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <MdOutlineIncompleteCircle className="size-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold">
              {/* {data?.totalOrders} */}
              {totalSales}
            </span>
            <span className="block text-gray-500">Total Orders</span>
          </div>
        </div>
        <div className="w-full">
          <h1 className="text-3xl font-bold text-center mb-6">
            Books and Their Users
          </h1>
          <div className="flex flex-col w-full items-center gap-4">
            {books.length === 0 && (
              <h1 className="text-3xl font-bold text-center">
                No books found. Please add some books using the admin panel.
              </h1>
            )}

            {books.map((book) => (
              <div
                key={book._id}
                className="bg-white border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow w-full"
              >
                {/* Book Title */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {book.title}
                  </h2>
                  <button
                    onClick={() => toggleDropdown(book._id)}
                    className="text-gray-600 hover:text-gray-800 transition-all duration-700"
                  >
                    {openBook === book._id ? "Hide Users" : "Show Users"}
                  </button>
                </div>

                {/* Dropdown User List */}
                {openBook === book._id && (
                  <div className="mt-4 transition-all duration-1000">
                    <p className="text-gray-500 text-sm mb-2">
                      {book.users.length > 0
                        ? `Users who added this book:`
                        : `No users have added this book yet.`}
                    </p>
                    <ul className="space-y-2">
                      {book.users.map((user, index) => (
                        <li
                          key={index}
                          className="text-gray-700 text-sm bg-gray-100 rounded px-3 py-1"
                        >
                          {user}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default SalesDetails;
