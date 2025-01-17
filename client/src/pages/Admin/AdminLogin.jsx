import React from "react";
import { useForm } from "react-hook-form";
import { useLoginAdminMutation } from "../../redux/features/users/adminApi.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  // Use React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [loginAdmin] = useLoginAdminMutation();

  const navigate = useNavigate()

  // Form submission handler
  const onSubmit = async (data) => {
    console.log(data);

    const dataTosend = {
      email: data.email,
      password: data.password,
    }
    console.log(dataTosend);
    // You can send the form data to an API or handle it here
    const response = await loginAdmin(data)
    console.log(response);
    // console.log(response);
    if (response.data) {
      console.log("Login Successful");
      // Reset the form after successful login
      reset();
      toast.success("Login Successful")
      setTimeout(() => {
        navigate("/api/auth/admin")
      }, 600);
    }else{
      toast.error("Invalid credentials")
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-[90vw] sm:w-[60vw] md:w-[450px]  mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="secret"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Secret Code
            </label>
            <input
              type="number"
              id="secret"
              {...register("secret", {
                required: "Secret question answer is required",
              })}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.secret && (
              <p className="text-red-500 text-sm mt-1">
                {errors.secret.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
