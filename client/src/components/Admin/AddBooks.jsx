import React from "react";
import { useForm } from "react-hook-form";
import { useCreateBookMutation } from "../../redux/features/books/booksApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addAdminBooks } from "../../redux/features/dashboard/dashboardSlice";

const categories = [
  "choose a genre",
  "business",
  "fiction",
  "horror",
  "adventure",
];

const AddBooks = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [createBook] = useCreateBookMutation()

  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    console.log("Form Data Submitted:", data);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("oldPrice", data.oldPrice);
    formData.append("newPrice", data.newPrice);
    formData.append("category", data.category);
    formData.append("trending", data.trending);
    formData.append("coverImage", data.coverImage[0]); // File input

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    // Handle the form submission logic (e.g., API call)
    const response = await createBook(formData).unwrap();
    console.log(response);
    if (response) {
        dispatch(addAdminBooks(response))
        toast.success("Book created successfully")
    }
    reset();
  };

  return (
    <div className="max-w-[90vw] sm:max-w-[70vw] md:w-[60vw] mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" >
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            className="w-full border rounded px-3 py-2"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows="3"
            className="w-full border rounded px-3 py-2"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Category Select */}
        <div className="mb-4">
          <label htmlFor="category" className="block font-medium mb-1">
            Category
          </label>
          <select
            {...register("category", {
              required: "Please select a category",
              validate: (value) =>
                value !== "choose a genre" || "Please select a valid category",
            })}
            className="w-full border rounded px-3 py-2"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Old Price */}
        <div className="mb-4">
          <label htmlFor="oldPrice" className="block font-medium mb-1">
            Old Price
          </label>
          <input
            {...register("oldPrice", {
              required: "Old price is required",
              valueAsNumber: true,
              validate: (value) => value > 0 || "Old price must be positive",
            })}
            type="number"
            className="w-full border rounded px-3 py-2"
          />
          {errors.oldPrice && (
            <p className="text-red-500 text-sm">{errors.oldPrice.message}</p>
          )}
        </div>

        {/* New Price */}
        <div className="mb-4">
          <label htmlFor="newPrice" className="block font-medium mb-1">
            New Price
          </label>
          <input
            {...register("newPrice", {
              required: "New price is required",
              valueAsNumber: true,
              validate: (value) => value > 0 || "New price must be positive",
            })}
            type="number"
            className="w-full border rounded px-3 py-2"
          />
          {errors.newPrice && (
            <p className="text-red-500 text-sm">{errors.newPrice.message}</p>
          )}
        </div>

        {/* Cover Image */}
        <div className="mb-4">
          <label htmlFor="coverImage" className="block font-medium mb-1">
            Cover Image
          </label>
          <input
            {...register("coverImage", { required: "Cover image is required" })}
            type="file"
            className="w-full"
          />
          {errors.coverImage && (
            <p className="text-red-500 text-sm">{errors.coverImage.message}</p>
          )}
        </div>

        {/* Trending */}
        <div className="mb-4">
          <label htmlFor="trending" className="block font-medium mb-1">
            Trending
          </label>
          <input {...register("trending")} type="checkbox" className="mr-2" />
          Trending
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBooks;
