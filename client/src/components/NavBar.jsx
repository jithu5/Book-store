import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import {
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import avatar from "../assets/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../Context/AuthContext";
import {
  useGetCartBooksDbQuery,
  useLogoutUserDbMutation,
} from "../redux/features/users/usersApi";
import { setCart } from "../redux/features/cart/cartSlice";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/order" },
  { name: "Cart Page", href: "/cart" },
  { name: "Checkout", href: "/checkout" },
];

function NavBar() {
  const [isDropDown, setIsDropDown] = useState(false);
  const { currentUser, signOutUser } = useContext(AuthContext);
  const cartitems = useSelector((state) => state.cart.cartitems);
  const [cartItemCount, setCartItemCount] = useState(0);
  const { data ,isSuccess} = useGetCartBooksDbQuery(undefined, {
    refetchOnMountOrArgChange: false,
    staleTime: 0,
  });

  const [logoutUserDb] = useLogoutUserDbMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSignout = async () => {
    signOutUser();
    const res = await logoutUserDb();
    if (res) {
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  };

  useEffect(() => {
    if (cartitems.length > 0) {
      setCartItemCount(cartitems.length);
    } else {
      setCartItemCount(0);
    }
  }, [cartitems]);
  
  useEffect(() => {
    if (data && isSuccess) {
      console.log("running")
      dispatch(setCart(data.data));
    }
  }, [data,isSuccess,dispatch]);
  console.log(cartitems);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isDropDown && !e.target.closest(".dropdown")) {
        setIsDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isDropDown]);

  return (
    <header className="max-w-screen-2xl mx-auto px-6 sm:px-8 md:px-14 py-3">
      <nav className="flex justify-between items-center">
        {/* Left Side */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/" className="text-2xl font-black text-black">
            <RiMenu2Line />
          </Link>
          <div className="relative sm:w-72 w-40 space-x-2">
            <CiSearch className="absolute top-1.5 sm:top-2 left-3 sm:left-2.5 font-bold text-sm sm:text-xl" />
            <input
              type="text"
              className="border border-stone-600 sm:py-1 px-4 pl-6 rounded-md w-full outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-lg"
              placeholder="Search for books..."
              aria-label="Search for books"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center md:space-x-3 space-x-2 relative">
          {currentUser ? (
            <div className="relative dropdown">
              <button onClick={() => setIsDropDown((prev) => !prev)}>
                <img
                  src={avatar || currentUser.avatar || avatar}
                  className="w-6 md:w-8"
                  alt="User Avatar"
                />
              </button>
              {isDropDown && (
                <div className="absolute top-10 left-1/2 -translate-x-[50%] bg-gray-50 shadow-lg py-2 px-4 rounded-md z-40">
                  <ul>
                    {navigation.map((nav, index) => (
                      <li key={index}>
                        <Link
                          to={nav.href}
                          onClick={() => setIsDropDown(false)}
                          className="text-sm md:text-lg font-medium text-stone-500 hover:text-stone-950"
                        >
                          {nav.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleSignout}
                        className="text-sm md:text-lg font-medium text-stone-500 hover:text-stone-950"
                      >
                        Sign Out
                      </button>
                    </li>
                    <li className="text-sm md:text-lg font-medium text-stone-500">
                      {currentUser.username}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <HiOutlineUser className="text-xl md:text-2xl" />
            </Link>
          )}
          <button className="hidden sm:inline-block">
            <HiOutlineHeart className="text-xl md:text-2xl" />
          </button>
          <Link
            to="/cart"
            className="flex items-center bg-primary p-1 sm:px-5 px-2 rounded-md"
          >
            <HiOutlineShoppingCart className="text-xl md:text-2xl" />
            <span className="text-sm font-semibold sm:ml-1">
              {cartItemCount}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
