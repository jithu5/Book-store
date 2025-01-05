import {AsyncHandler} from "../utils/AsyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import BookModel from "../models/book.model.js"
import fs from "fs"
import { uploadImageToCloudinary } from "../config/cloudinary.config.js"

export const createBooks = AsyncHandler(async(req,res)=>{
    const { title, description, oldPrice, newPrice, category, trending } =
        req.body;
      if (!title || !description || !newPrice || !category) {
          throw new ApiError(400,"All fileds are required");
      }

      // Handle file upload
      const coverImagePath = req?.file?.path;

      if (!coverImagePath) {
        throw new ApiError(400, 'Cover image is required');
      }

      const coverImage = await uploadImageToCloudinary(coverImagePath);

      if (!coverImage || !coverImage.secure_url) {
        throw new ApiError(500, 'Failed to upload cover image to cloudinary');
      }

      try {
        const book = await BookModel.create({
          title,
          description,
          oldPrice,
          newPrice,
          trending:trending || false,
          category,
          coverImage: coverImage.secure_url,
        });
  
        return res.status(201).json(new ApiResponse(201, book, 'Book created successfully'));
      } catch (error) {
        if (fs.existsSync(coverImagePath)) {
            fs.unlinkSync(coverImagePath)
        }
        throw new ApiError(error.statusCode, error.message)
      }

})

export const getBooks = AsyncHandler(async(req,res)=>{
    try {
        const book = await BookModel.find();

        if (!book) {
            throw new ApiError(404, 'Book not found');
        }
        
        return res.json(new ApiResponse(200, book, 'Books fetched successfully'));
    } catch (error) {
        throw new ApiError(error.statusCode,error.message)
    }
})