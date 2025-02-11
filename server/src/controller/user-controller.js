import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import UserModel from "../models/user.model.js";
import BookModel from "../models/book.model.js"
import CartModel from "../models/cart.model.js"
import mongoose from "mongoose";

export const signUp = AsyncHandler(async (req, res) => {
    const { username, email } = req.body;
    if (!username ||!email) {
        throw new ApiError(400, "All fields are required");
    }
    try {
        const existingUser = await UserModel.findOne({email})
        if (existingUser) {
            throw new ApiError(400, "Email already exists");
        }
        const newUser = await UserModel.create({username, email});
        console.log("User created successfully", newUser);
         const token = await newUser.generateAccessToken();
         if (!token) {
             throw new ApiError(401, 'Cannot create token');
         }

        return res
            .status(200)
            .cookie('token', token, {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 hour
                httpOnly: true,
                secure: false, // set to true for HTTPS only
                sameSite: 'lax', // Options: 'strict', 'lax', 'none'
            })
            .json(new ApiResponse(200, newUser, 'User created successfully'));
    } catch (error) {
        throw new ApiError(error.statusCode, error.message)
    }
})

export const Login = AsyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new ApiError(400, "All fields are required");
    }
    try {
        const user = await UserModel.findOne({email});
        if (!user) {
            throw new ApiError(401, "Invalid credentials");
        }
        const token = await user.generateAccessToken();
        if (!token) {
            throw new ApiError(401, "Cannot create token");
        }
        console.log(token)
        console.log(token)
        return res
            .status(200)
            .cookie('token', token, {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 hour
                httpOnly: true,
                secure: false, // set to true for HTTPS only
                sameSite: 'lax', // Options: 'strict', 'lax', 'none'
            })
            .json(new ApiResponse(200, user, 'User logged in successfully'));
    } catch (error) {
        console.log(error)
        throw new ApiError(error.statusCode, error.message)
    }
})

export const Logout = AsyncHandler(async (req, res) => {
    res.clearCookie('token', { path: '/' });
    return res.json(new ApiResponse(200, 1, 'User logged out successfully'));
})

export const addToCart = AsyncHandler(async (req, res) => {
    const { bookId } = req.params;
    const userId = req.user;
    console.log(bookId, userId);
    try {
        const book = await BookModel.findById(bookId);
        if (!book) {
            throw new ApiError(404, 'Book not found');
        }
        const cartExistsForUser = await CartModel.findOne({
            $and: [
                { userId: userId }, // Replace 'userId' with the actual user ID value or variable
                { bookId: bookId }, // Replace 'bookId' with the actual book ID value or variable
            ],
        });
        console.log('exists for user', cartExistsForUser);

        if (cartExistsForUser) {
            throw new ApiError(400, 'Book already in cart');
        }
        const newCart = await CartModel.create({
            userId,
            bookId,
            totalAmount: book.newPrice,
        });

        return res
            .status(201)
            .json(
                new ApiResponse(201, newCart, 'Book added to cart successfully')
            );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

export const getCartBooks = AsyncHandler(async(req,res)=>{
    const userId = req.user
    console.log("User id: " + userId)
    try {
         const cartItems = await UserModel.aggregate([
             {
                 $match: {
                     _id: new mongoose.Types.ObjectId(String(userId)),
                 },
             },
             {
                 $lookup: {
                     from: 'carts',
                     localField: '_id',
                     foreignField: 'userId',
                     as: 'cartItems', // Renamed to cartItems to make it plural (correct variable naming)
                 },
             },
             {
                 $unwind: '$cartItems', // Flatten the cartItems array
             },
             {
                 $lookup: {
                     from: 'books',
                     localField: 'cartItems.bookId',
                     foreignField: '_id',
                     as: 'cartBooks',
                 },
             },
             {
                 $unwind: '$cartBooks', // Flatten the cartBooks array
             },
             {
                 $project: {
                     _id: 1,
                     bookId: '$cartBooks._id',
                     title: '$cartBooks.title',
                     author: '$cartBooks.author',
                     newPrice: '$cartItems.totalAmount',
                     cartId: '$cartItems._id',
                     quantity: '$cartItems.quantity',
                     coverImage: '$cartBooks.coverImage'
                 },
             },
         ]);

         // Check the result of aggregation
         console.log('Cart Items:', cartItems);
        return res
        .status(200)
        .json(new ApiResponse(200, cartItems, 'Cart books fetched successfully'));
    } catch (error) {
        throw new ApiError(500,"Failed to fetch Cart books")
    }
})