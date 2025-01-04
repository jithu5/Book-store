import React from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    toast.success("Login Successful", { position: "top-right" });
    reset(); // Clear input fields
  };

  const onError = (errors) => {
    if (errors.email) {
      toast.error("Email is required and must be valid", {
        position: "top-right",
      });
    }
    if (errors.password) {
      if (errors.password.type === "required") {
        toast.error("Password is required", { position: "top-right" });
      } else if (errors.password.type === "minLength") {
        toast.error("Password must be at least 6 characters long", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        limit={2}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />

      <div className="h-screen flex items-center justify-center">
        <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Please Login</h2>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email Address"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex flex-wrap space-y-2.5 items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>

          <p className="inline-block align-baseline font-medium mt-4 text-sm">
            Don't have an account? Please{" "}
            <Link to="/register" className="text-blue-500 hover:text-blue-800">
              Register
            </Link>
          </p>

          <div className="mt-4">
            <button className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              <FaGoogle className="mr-2" />
              Sign in with Google
            </button>
          </div>

          <p className="mt-5 text-center text-gray-500 text-xs">
            &copy;2025 Book Store. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
