import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRemoveFromCartDbMutation } from "../../redux/features/books/booksApi";
import { useGetCartBooksDbQuery } from "../../redux/features/users/usersApi";
import {
  setCart,
  removeFromCart,
  clearCart,
} from "../../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error, isSuccess,refetch } = useGetCartBooksDbQuery(undefined,
    {refetchOnMountOrArgChanges: true})
  
  const cartItems = useSelector((state) => state.cart.cartitems);

  const [removeFromCartDb] = useRemoveFromCartDbMutation();
  console.log(cartItems)

  useEffect(()=>{
    console.log("running in cart page")
    refetch()
  },[])

  // Synchronize Redux state with backend data
  // useEffect(() => {
  //   console.log(isSuccess);
  //   console.log(data);
  //   if (isSuccess && data?.data?.length > 0) {
  //     console.log("running in cart page");
  //     dispatch(setCart(data.data)); // Update Redux state
  //   }
  // }, [data, isSuccess]);
    useEffect(() => {
      if (isSuccess && data?.data?.length > 0) {
        console.log("inside data");
        if (cartItems.length === 0) {
          console.log("inside cartItems");

          console.log("running in cart page");
          dispatch(setCart(data.data)); // Update Redux state
        }
      }
    }, [data]);

  if (isLoading) {
    return <p className="text-center mt-6">Loading...</p>;
  }
  // Remove item from cart
  const handleRemoveItem = async (id) => {
    if (!id) {
      console.error("Invalid book ID, cannot remove item");
      return;
    }

    try {
      dispatch(removeFromCart(id));

      await removeFromCartDb(id);
    } catch (err) {
      console.error("Failed to remove item:", err);

      // Optionally revert state if the backend request fails
      dispatch(setCart(data?.data || [])); // Revert to backend data if necessary
    }
  };

  const handleClearCart = async () => {
    dispatch(clearCart());
    await removeFromCartDb(); // Clear cart and refetch data from the backend
  };

  const total = cartItems.reduce((total, item) => total + item.newPrice, 0);

  if (error) {
    console.log(JSON.stringify(error));
    return (
      <p className="text-center mt-6 text-red-500">
        Failed to load cart: {JSON.stringify(error.message)}
      </p>
    );
  }

  return (
    <div className="flex flex-col mt-12 bg-white shadow-xl">
      <div className="px-6 py-4 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">Your Shopping Cart</h1>
      </div>

      <div className="relative p-6 flex-1">
        {cartItems.length === 0 ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Your Cart is Empty</h2>
          </div>
        ) : (
          <>
            <button className="absolute top-2 right-3 bg-red-600 px-3 py-1 text-white font-semibold rounded-md">
              clear Cart
            </button>
            <ul className="space-y-4 mt-10">
              {cartItems.map((item) => (
                <CartItem
                  key={item.cartId}
                  item={item}
                  onRemove={handleRemoveItem}
                />
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${total}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <Link to="/">
            or
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartItem = ({ item, onRemove }) => (
  <li className="flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <img
        src={item.coverImage}
        alt={item.title}
        className="w-16 h-16 object-cover rounded"
      />
      <div>
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-500">{item.category}</p>
        <p className="text-sm text-gray-500">
          <strong>Price:</strong> ${item.newPrice}
        </p>
      </div>
    </div>
    <button
      onClick={() => onRemove(item.cartId)} // Ensure a valid ID is passed
      className="px-3 py-2 text-sm text-red-600 hover:underline"
    >
      Remove
    </button>
  </li>
);

export default CartPage;
