import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRemoveFromCartDbMutation } from "../../redux/features/books/booksApi";
import { useGetCartBooksDbQuery } from "../../redux/features/users/usersApi";
import { setCart, removeFromCart,clearCart } from "../../redux/features/cart/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetCartBooksDbQuery(
    undefined,
    { refetchOnMountOrArgChange: true, staleTime: 5000 } // Ensure fresh fetch
  );
  const cartItems = useSelector((state) => state.cart.cartitems);

  const [removeFromCartDb] = useRemoveFromCartDbMutation();

  // Synchronize Redux state with backend data
  useEffect(() => {
    if (data?.data) {
      dispatch(setCart(data.data)); // Update Redux state
    }
  }, [data, dispatch]);

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
      // Optimistically remove the item from Redux state
      dispatch(removeFromCart(id));

      // Trigger backend mutation
      await removeFromCartDb(id);
    } catch (err) {
      console.error("Failed to remove item:", err);

      // Optionally revert state if the backend request fails
      dispatch(setCart(data?.data || [])); // Revert to backend data if necessary
    }
  };

   const handleClearCart = async ()=>{
    dispatch(clearCart());
    await removeFromCartDb(); // Clear cart and refetch data from the backend
   }

  if (error) {
    return (
      <p className="text-center mt-6 text-red-500">
        Failed to load cart: {error.message}
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
        ) : (<>
          <button className="absolute top-2 right-3 bg-red-600 px-3 py-1 text-white font-semibold rounded-md">clear Cart</button>
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
