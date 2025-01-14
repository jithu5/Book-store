import React, { useContext } from "react";

import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useAddToCartDbMutation } from "../../redux/features/books/booksApi";

import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

function BookCard({ book }) {
  const dispatch = useDispatch();

  const [addToCartDb] = useAddToCartDbMutation();

  const {currentUser} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleAddToCart =async (product) => {
  try {
    // Dispatch to Redux store
    console.log(product);
    if (currentUser) {

      const response = await addToCartDb(product._id).unwrap();  // Using unwrap to get the response
    dispatch(addToCart({...product,cartId:response._id}));

    console.log(currentUser);
      
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
    }else{
      Swal.fire({
        title: "Please login to add to cart!",
        icon: "info",
        confirmButtonText: "Login",
        confirmButtonColor: "#FFCE1A",
        showCancelButton: true,
        cancelButtonColor: "#DC143C",
        position: "top-right",
        backdrop: `
      rgba(0,0,0,0.4)
      url("https://source.unsplash.com/random/800x600")
      no-repeat
    `,
        backdropBlendMode: "overlay",
      }).then((result) => {
        if (result.isConfirmed) {
          // Navigate to the login page
          navigate("/login");
        }
      });
    }
  } catch (error) {
    // Handle any errors from the API call
    console.error('Failed to add to cart:', error);
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
  }
  return (
    <>
      <div className=" rounded-lg transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:h-80  sm:justify-center gap-4">
          <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
            <Link to={`/books/${book?._id}`}>
              <img
                src={book?.coverImage}
                alt=""
                className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
              />
            </Link>
          </div>

          <div>
            <Link to={`/books/${book?._id}`}>
              <h3 className="text-lg font-semibold hover:text-blue-600 mb-3">
                {book?.title}
              </h3>
            </Link>
            <p className="text-gray-600 mb-5">
              {book?.description.length > 80
                ? `${book.description.slice(0, 80)}...`
                : book.description}
            </p>
            <p className="font-medium mb-5">
              ${book?.newPrice}{" "}
              <span className="line-through font-normal ml-2">
                ${book?.oldPrice}
              </span>
            </p>
            <button 
            onClick = {()=>handleAddToCart(book)} className="btn-primary  flex items-center justify-center">
              <FiShoppingCart className="text-lg" />
              <span className="text-md inline-block">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookCard;
