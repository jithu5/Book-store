import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import {
  useFetchBookByIdQuery,
} from "../../redux/features/books/booksApi";
import { useAddToCartDbMutation } from "../../redux/features/users/usersApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import Swal from "sweetalert2";

function SingleBook() {
  const { bookId } = useParams();
  // fetch book data from API and display it here
  const { data, isError, isLoading } = useFetchBookByIdQuery(bookId);
  const book = data?.data;
  console.log(book);

  const [addToCartDb] = useAddToCartDbMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [bookId]);

  const handleAddToCart = async (product) => {
    try {
      const response = await addToCartDb(product._id).unwrap(); // Using unwrap to get the response
      dispatch(addToCart({ ...product, cartId: response._id }));
      if (response) {
        // Optionally, show a success notification
        Swal.fire({
          title: "Book added to cart!",
          icon: "success",
          confirmButtonText: "Continue Shopping",
          confirmButtonColor: "#FFCE1A",
          color: "#0D0842",
          position: "top-right",
        });
      }
    } catch (error) {
      // Handle any errors from the API call
      console.error("Failed to add to cart:", error);
      Swal.fire({
        title: "Book already in cart!",
        icon: "info",
        confirmButtonText: "View Cart",
        confirmButtonColor: "#FFCE1A",
        showCancelButton: true,
        cancelButtonColor: "#DC143C",
        position: "top-right",
      });
    }
  };

  // Show a loading indicator while the data is being fetched
  if (isLoading) {
    return (
      <p className="text-stone-700 text-md sm:text-lg font-primary font-semibold text-center mt-20">
        Loading book details...
      </p>
    );
  }

  // Show an error message if the API call fails
  if (isError) {
    return (
      <p className="text-red-500 text-md sm:text-lg font-primary text-center font-semibold mt-20">
        Failed to load book details. Please try again later.
      </p>
    );
  }

  // Render the book details when data is available
  return (
    <div className="max-w-lg shadow-md p-5">
      <h1 className="text-2xl font-bold mb-6">{book.title}</h1>

      <div className="">
        <div>
          <img src={book.coverImage} alt={book.title} className="mb-8" />
        </div>

        <div className="mb-5">
          <p className="text-gray-700 mb-2">
            <strong>Author:</strong> {book.author || "admin"}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Published:</strong>{" "}
            {new Date(book?.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700 mb-4 capitalize">
            <strong>Category:</strong> {book?.category}
          </p>
          <p className="text-gray-700">
            <strong>Description:</strong> {book.description}
          </p>
        </div>

        <button
          onClick={() => handleAddToCart(book)}
          className="btn-primary px-6 space-x-1 flex items-center gap-1 "
        >
          <FiShoppingCart className="" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}

export default SingleBook;
