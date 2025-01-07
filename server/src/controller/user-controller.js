import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import UserModel from "../models/user.model.js";
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

        return res.status(200).json(new ApiResponse(200,newUser,"User created successfully"));
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
        console.log(token)
        return res
            .status(200)
            .cookie('token', token, {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 hour
                httpOnly: true,
                secure: false, // set to true for HTTPS only
            })
            .json(new ApiResponse(200, user, 'User logged in successfully'));
    } catch (error) {
        console.log(error)
        throw new ApiError(error.statusCode, error.message)
    }
})

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