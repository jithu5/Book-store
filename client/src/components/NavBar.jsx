import React, { useState } from "react";
import { Link } from "react-router-dom";

import { RiMenu2Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineShoppingCart } from "react-icons/hi2";

import avatar from "../assets/avatar.png";

const navigation =[
  {name:"Dashboard",href:"/dashboard"},
  {name:"Orders",href:"/order"},
  {name:"Cart Page",href:"/cart"},
  {name:"Checkout",href:"/checkout"},
]

function NavBar() {

  const [isDropDown, setIsDropDown] = useState(false)

  const currentUser = true;
  return (
    <>
      <header className="max-w-screen-2xl mx-auto px-6 sm:px-8 md:px-14 py-3">
        <nav className="flex justify-between items-center">
          {/* left side */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/" className="text-2xl font-black text-black">
              <RiMenu2Line />
            </Link>
            {/* search input */}
            <div className="relative sm:w-72 w-40 space-x-2">
              <CiSearch className="absolute top-1.5 sm:top-2 sm:text-md left-3 sm:left-2.5 font-bold inline-block text-sm sm:text-xl" />
              <input
                type="text"
                className="border border-stone-600  sm:py-1 px-4 pl-6 rounded-md w-full outline-none 
                focus:border-none focus:ring-2 focus:ring-blue-400
                text-sm sm:text-lg"
                placeholder="Search for books..."
              />
            </div>
          </div>

          {/* right side */}
          <div className="flex items-center md:space-x-3 space-x-2 relative">
            <div className="relative">
              {currentUser ? (
                <>
                  <button onClick={()=>setIsDropDown(prev=>!prev)} className="relative">
                    <img src={avatar} className="w-6 md:w-8" alt="" />
                  </button>
                  {/* show dropdown */}
                  {isDropDown && (
                    <div className="absolute top-10 left-1/2 -translate-x-[50%] bg-gray-50 shadow-lg py-2 px-4 rounded-md z-40 pl-4 pr-10 md:pr-16">
                      <ul>
                        {navigation.map((nav, index) => (
                          <li key={index}>
                            <Link to={nav.href} onClick={()=>setIsDropDown(false)} className="text-sm md:text-lg font-medium text-stone-500 hover:text-stone-950">
                              {nav.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <HiOutlineUser className="text-xl md:text-2xl" />
              )}
            </div>
            <button className="hidden sm:inline-block">
              <HiOutlineHeart className="text-xl md:text-2xl" />
            </button>
            <Link
              to={"cart"}
              className="flex items-center bg-primary p-1 sm:px-5 px-2 rounded-md"
            >
              <HiOutlineShoppingCart className="text-xl md:text-2xl" />
              <span className="text-sm font-semibold sm:ml-1 inline-block">
                0
              </span>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}

export default NavBar;
