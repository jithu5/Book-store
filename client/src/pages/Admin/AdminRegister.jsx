import React from "react";
import { useForm } from "react-hook-form";
import { useRegisterAdminMutation } from "../../redux/features/users/adminApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  // Use React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  
  const navigate = useNavigate()
  const [ registerAdmin ] = useRegisterAdminMutation()

  // Form submission handler
  const onSubmit = async (data) => {
    console.log(data);
    // You can send the form data to an API or handle it here
    const response = await registerAdmin(data);
    if (response.data) {
      toast.success("Successfully registered Admin")
      // Reset the form after successful registration
      reset();
      setTimeout(() => {
        // Navigate to admin login page
       navigate("/api/auth/admin")
      }, 300);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">

    <div className="w-[90vw] sm:w-[60vw] md:w-[450px] mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        Admin Registration
      </h2>
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
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register("username", { required: "Username is required" })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
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
            type="text"
            id="secret"
            {...register("secret", {
              required: "Secret question answer is required",
            })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.secret && (
            <p className="text-red-500 text-sm mt-1">{errors.secret.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
    </div>
  );
};

export default AdminRegister;
