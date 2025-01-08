import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast, ToastContainer, Zoom } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import { useRegisterUserinDBMutation } from "../redux/features/users/usersApi";

function Register() {
  const navigate = useNavigate();

  const { registerUser, signInUsingGoogle } = useContext(AuthContext);

  const [registerUserInDb] = useRegisterUserinDBMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Register Data:", data);

    try {
      // Register the user with Firebase/Auth context
      const user = await registerUser(data.email, data.password);
      console.log("Registered User:", user);

      if (user) {
        const { email: userEmail, displayName } = user;

        // Fallback to username if displayName is not available
        const username = displayName || user.email.split("@")[0];
        console.log("Username for DB:", username);

        try {
          // Save user to DB
          const myUser = await registerUserInDb({
            email: userEmail,
            username,
          }).unwrap();
          console.log("User saved in DB:", myUser);

          toast.success("User registered successfully");

          // Navigate to home after a delay
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } catch (err) {
          console.error("Error saving user to DB:", err);
          toast.error("Failed to save user to DB");
          return; // Exit early if saving to DB fails
        }
      } else {
        toast.error("Failed to register user");
        return; // Exit early if user registration fails
      }

      // Reset the form
      console.log("Resetting form...");
      reset();
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Please provide a valid email and password");
    }
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

  const SignUpWithGoogle = async () => {
    try {
      const user = await signInUsingGoogle();
      if (user) {
        const response = await registerUserInDb({
          email: user.email,
          username: user.displayName,
        });
        if (response) {
          toast.success("User registered successfully");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } else {
        toast.error("Failed to register user");
      }
    } catch (error) {
      toast.error(error.message);
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
            <button
              onClick={SignUpWithGoogle}
              className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
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
