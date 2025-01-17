import { AsyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import BookModel from '../models/book.model.js';
import CartModel from "../models/cart.model.js"
import fs from 'fs';
import {
    deleteImageCloudinary,
    uploadImageToCloudinary,
} from '../config/cloudinary.config.js';
import UserModel from "../models/user.model.js"

import { extractPublicId } from '../utils/ExtractPublicId.js';
import AdminModel from '../models/admin.model.js';
import mongoose from 'mongoose';

export const createBooks = AsyncHandler(async (req, res) => {
    const { title, description, oldPrice, newPrice, category, trending } =
        req.body;
    const adminId = req.admin;
    console.log('Received Data:', req.body); // Logs the parsed text data
    console.log('Received File:', req.file); // Logs the uploaded file details
    if (!title || !description || !newPrice || !category) {
        throw new ApiError(400, 'All fileds are required');
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
        const admin = await AdminModel.findById(adminId);
        if (!admin) {
            throw new ApiError(404, 'Admin not found');
        }
        const book = await BookModel.create({
            title,
            description,
            oldPrice,
            newPrice,
            trending: trending || false,
            category,
            coverImage: coverImage.secure_url,
            author: admin.username,
        });

        return res
            .status(201)
            .json(new ApiResponse(201, book, 'Book created successfully'));
    } catch (error) {
        if (fs.existsSync(coverImagePath)) {
            fs.unlinkSync(coverImagePath);
        }
        console.log(error);
        throw new ApiError(error.statusCode, error.message);
    }
});

export const getBooks = AsyncHandler(async (req, res) => {
    try {
        const book = await BookModel.find().sort({ createdAt: -1 });

        if (!book) {
            throw new ApiError(404, 'Book not found');
        }

        return res.json(
            new ApiResponse(200, book, 'Books fetched successfully')
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

export const getBookById = AsyncHandler(async (req, res) => {
    const { bookId } = req.params;
    console.log(req.params)

    try {
        const book = await BookModel.findById(bookId);

        if (!book) {
            throw new ApiError(404, 'Book not found');
        }

        return res.json(
            new ApiResponse(200, book, 'Book fetched successfully')
        );
    } catch (error) {
        throw new ApiError(error.statusCode, 'failed to get book');
    }
}); 

export const updateBook = AsyncHandler(async (req, res) => {
    const { bookId } = req.params;
    const id = req.params.bookId;
// for (let [key, value] of formData.entries()) {
//     console.log(`key ${key} and value ${value}`);
// }

    console.log("params",req.params);
    console.log("body",req.body)
    const { title, description, oldPrice, newPrice, category, trending } =
        req.body;

    try {
        const book = await BookModel.findById(bookId);

        if (!book) {
            throw new ApiError(404, 'Book not found');
        }

        let newCoverImageUrl = book.coverImage;

        if (req.file) {
            const uploadResponse = await uploadImageToCloudinary(req.file.path);

            if (!uploadResponse) {
                throw new ApiError(
                    500,
                    'Failed to upload cover image to cloudinary'
                );
            }
            if (book.coverImage) {
                const publicId = extractPublicId(book.coverImage);
                console.log(publicId);
                await deleteImageCloudinary(publicId);
            }
            newCoverImageUrl = uploadResponse.secure_url;
        }

        const updatedBook = await BookModel.findByIdAndUpdate(
            bookId,
            {
                title,
                description,
                oldPrice,
                newPrice,
                trending: trending || false,
                category,
                coverImage: newCoverImageUrl,
            },
            { new: true }
        );

        return res.json(
            new ApiResponse(200, updatedBook, 'Book updated successfully')
        );
    } catch (error) {
        console.log(error)
        throw new ApiError(error.statusCode, error.message);
    }
});

export const deleteBook = AsyncHandler(async (req, res) => {
    const { bookId } = req.params;
    try {
        const book = await BookModel.findById(bookId);
        if (!book) {
            throw new ApiError(404, 'Book not found');
        }
        if (book.coverImage) {
            const publicId = extractPublicId(book.coverImage);
            console.log("public id of image " + publicId);
            await deleteImageCloudinary(publicId);
        }
        const deletedBook  = await BookModel.findByIdAndDelete(bookId);
        return res.json(
            new ApiResponse(200, deletedBook, 'Book deleted successfully')
        );
        
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});



export const deleteCartitem = AsyncHandler(
    async (req, res) => {
        const { cartItemId } = req.params;
        console.log(cartItemId);
        try {
            const cartItem = await CartModel.findByIdAndDelete(cartItemId);
            if (!cartItem) {
                throw new ApiError(404, 'Cart item not found');
            }
            return res.json(
                new ApiResponse(200, cartItem, 'Cart item deleted successfully')
            );
        } catch (error) {
            throw new ApiError(error.statusCode, error.message);
        }
    })
