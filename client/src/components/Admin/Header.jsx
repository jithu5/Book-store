import React, { useContext } from "react";
import { AdminAuthContext } from "../../Context/AdminAuthContext";
import { useLgoutAdminMutation } from "../../redux/features/users/adminApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearBooksInAdmin } from "../../redux/features/dashboard/dashboardSlice";

function Header({ setOpenSideBar }) {
  const { currentAdmin, loading } = useContext(AdminAuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutAdmin] = useLgoutAdminMutation();

  if (loading) {
    return <p>loading..</p>;
  }

  const handleLogout = async () => {
    const response = await logoutAdmin();
    if (response) {
      dispatch(clearBooksInAdmin());
      toast.success("Admin has been logged out successfully");
      setTimeout(() => {
        navigate("/api/auth/admin/login");
      }, 300);
    }
  };

  return (
    <>
      <header className="flex items-center h-20 px-6 sm:px-10 bg-white">
        <button
          onClick={() => setOpenSideBar((prev) => !prev)}
          className="block fixed top-5 left-4 z-20 sm:hidden flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full"
        >
          <span className="sr-only">Menu</span>
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
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
        <div className="relative w-full max-w-md ml-20">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            role="search"
            placeholder="Search..."
            className="py-2 pl-10 pr-4 w-full border-4 border-transparent placeholder-gray-400 focus:bg-gray-50 rounded-lg"
          />
        </div>
        <div className="flex flex-shrink-0 items-center ml-auto">
          <div className="relative group h-fit w-fit p-0  cursor-pointer">
            <span className="h-12 w-12  bg-gray-100 rounded-full overflow-hidden flex justify-center items-center group-hover:bg-stone-300">
              <span className="text-lg uppercase font-semibold">
                {currentAdmin.username[0]}
              </span>
            </span>
            <div className="hidden absolute top-[103%] left-0 group-hover:flex flex-col gap-5 bg-stone-700 text-white rounded-md py-4 px-6">
              <span
                onClick={() => navigate("/api/auth/admin/profile")}
                className="font-semibold hover:text-blue-500"
              >
                {currentAdmin.username}
              </span>
              <span className="text-sm hover:text-blue-500">Lecturer</span>
            </div>
          </div>
          <div className="border-l pl-3 ml-3 space-x-1">
            <button
              onClick={handleLogout}
              className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full"
            >
              <span className="sr-only">Log out</span>
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
