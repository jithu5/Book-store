import React from 'react'
import { HiViewGridAdd } from "react-icons/hi";
import { FaHistory } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';

function SideBar() {
  return (
    <>
      <aside className="max-sm:fixed top-20 flex flex-col h-full max-sm:h-[90vh]">
        <Link
          to={""}
          className="inline-flex items-center justify-center h-20 w-20 bg-purple-600 hover:bg-purple-500 focus:bg-purple-500"
        >
          <img src="/fav-icon.png" alt="" />
        </Link>
        <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
          <nav className="flex flex-col mx-4 my-6 space-y-4">
            <NavLink
              to={"/api/auth/admin"}
              end
              className={({ isActive }) =>
                `inline-flex items-center justify-center py-3 ${
                  isActive
                    ? "text-purple-600 bg-white rounded-lg"
                    : "text-gray-400 bg-stone-900"
                }`
              }
            >
              <span className="sr-only">Dashboard</span>
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </NavLink>
            <NavLink
              to={"add-book"}
              className={({ isActive }) =>
                `inline-flex items-center justify-center py-3 ${
                  isActive
                    ? "text-purple-600 bg-white rounded-lg"
                    : "text-gray-400 bg-stone-900"
                }`
              }
            >
              <span className="sr-only">Add Book</span>
              <HiViewGridAdd className="h-6 w-6" />
            </NavLink>
            <NavLink
              to={"sales"}
              className={({ isActive }) =>
                `inline-flex items-center justify-center py-3 ${
                  isActive
                    ? "text-purple-600 bg-white rounded-lg"
                    : "text-gray-400 bg-stone-900"
                }`
              }
            >
              <span className="sr-only">Documents</span>
              <FaHistory className="h-6 w-6" />
            </NavLink>
          </nav>
          
        </div>
      </aside>
    </>
  );
}

export default SideBar
