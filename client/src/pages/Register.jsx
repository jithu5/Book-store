import React from "react";
import { Link } from "react-router-dom";

import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast, ToastContainer, Zoom } from "react-toastify";

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Register Data:", data);
    toast.success("Register Successful", { position: "top-right" });
    reset();
  };

  const onError = (errors) => {
    if (errors.email && errors.password) {
      toast.error("Email and Password is required", { position: "top-right" });
    } else if (errors.email) {
      toast.error("Email is required", { position: "top-right" });
    } else if (errors.password.type === "required") {
      toast.error("Password is required", { position: "top-right" });
    } else if (errors.password.type === "minLength") {
      toast.error("Password must be at least 6 characters long", {
        position: "top-right",
      });
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
      <div className="h-screen flex justify-center items-center ">
        <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Please Register</h2>

          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">Email is required</p>
              )}
            </div>
            <div className="mb-4">
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
                    message: "Password must be at least 6 characters long",
                  },
                })}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none">
                Register
              </button>
            </div>
          </form>
          <p className="align-baseline font-medium mt-4 text-sm">
            Have an account? Please{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Login
            </Link>
          </p>

          {/* google sign in */}
          <div className="mt-4">
            <button className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
              <FaGoogle className="mr-2" />
              Sign in with Google
            </button>
          </div>

          <p className="mt-5 text-center text-gray-500 text-xs">
            ©2025 Book Store. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
